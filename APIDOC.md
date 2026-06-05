# Todo API 문서

Base URL: `http://localhost:8091`

---

## 공통

### 응답 형식
모든 응답은 `Content-Type: application/json`

### 에러 응답
```json
{ "error": "에러 메시지" }
```

| 상태 코드 | 설명 |
|---|---|
| `400` | 요청 바디 유효성 오류 |
| `404` | 리소스 없음 |
| `500` | 서버 / DB 오류 |

---

## Todo

### 도메인 모델

```ts
interface Todo {
  id: number;          // 자동 생성 (int8)
  title: string;       // 제목
  description: string; // 설명
  completed: boolean;  // 완료 여부
}
```

---

### GET /api/todos

전체 Todo 목록을 최신순으로 반환합니다.

**응답 `200`**
```json
[
  {
    "id": 1,
    "title": "Hono 공부하기",
    "description": "Bun + Hono 조합 익히기",
    "completed": false
  }
]
```

---

### POST /api/todos

새 Todo를 추가합니다. `id`는 서버에서 자동 생성됩니다.

**요청 바디**
```json
{
  "title": "Hono 공부하기",
  "description": "Bun + Hono 조합 익히기"
}
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `title` | `string (min 1)` | O | 제목 |
| `description` | `string` | O | 설명 (빈 문자열 허용) |

**응답 `201`**
```json
{
  "id": 1,
  "title": "Hono 공부하기",
  "description": "Bun + Hono 조합 익히기",
  "completed": false
}
```

---

### PATCH /api/todos/:id

Todo의 제목, 설명, 완료 상태를 수정합니다. 변경할 필드만 전달합니다.

**Path Parameter**

| 파라미터 | 설명 |
|---|---|
| `id` | 수정할 Todo의 UUID |

**요청 바디** (모든 필드 선택)
```json
{
  "title": "수정된 제목",
  "description": "수정된 설명",
  "completed": true
}
```

| 필드 | 타입 | 설명 |
|---|---|---|
| `title` | `string (min 1)` | 제목 |
| `description` | `string` | 설명 |
| `completed` | `boolean` | 완료 여부 (토글 시 현재 값의 반대로 전달) |

**응답 `200`**
```json
{
  "id": 1,
  "title": "수정된 제목",
  "description": "수정된 설명",
  "completed": true
}
```

**응답 `404`** — 해당 id의 Todo 없음
```json
{ "error": "Todo not found" }
```

---

### DELETE /api/todos/:id

Todo를 삭제합니다.

**Path Parameter**

| 파라미터 | 설명 |
|---|---|
| `id` | 삭제할 Todo의 UUID |

**응답 `204`** — 본문 없음

**응답 `404`** — 해당 id의 Todo 없음
```json
{ "error": "Todo not found" }
```

---

## 예시 (curl)

```bash
# 목록 조회
curl http://localhost:8091/api/todos

# Todo 추가
curl -X POST http://localhost:8091/api/todos \
  -H "Content-Type: application/json" \
  -d '{"id":"1","title":"공부하기","description":"Hono 익히기"}'

# completed 토글
curl -X PATCH http://localhost:8091/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 삭제
curl -X DELETE http://localhost:8091/api/todos/1
```
