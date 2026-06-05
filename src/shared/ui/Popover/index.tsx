import React, { createContext, useContext, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  content?: string;
}

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue>({
  open: false,
  setOpen: () => {},
});

function Root({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <View>{children}</View>
    </PopoverContext.Provider>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = useContext(PopoverContext);
  return (
    <Pressable onPress={() => setOpen(true)}>
      {children}
    </Pressable>
  );
}

function Content({
  children,
  styleClass,
}: {
  children: React.ReactNode;
  styleClass?: StyleClass;
}) {
  const { open, setOpen } = useContext(PopoverContext);
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
        onPress={() => setOpen(false)}
      >
        <Pressable
          className={cn('m-4 rounded-lg bg-white p-4 shadow-md', styleClass?.content)}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const Popover = { Root, Trigger, Content };

export default Popover;
