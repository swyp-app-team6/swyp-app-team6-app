import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import TodoListItem from '@/widgets/todos/TodoListItem';
import { useGetTodosQuery } from '../api/useGetTodosQuery';
import { Todo } from '@/entities/todo';

export default function TodoList() {
  const { data: todos, refetch } = useGetTodosQuery();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }: { item: Todo }) => <TodoListItem {...item} />}
      contentContainerClassName="gap-2 mt-4 px-4 pb-4"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
