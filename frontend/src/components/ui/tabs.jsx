import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export function Tabs({ children, defaultValue = null }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={`flex space-x-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, className = "" }) {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  const onClick = () => ctx?.setValue?.(value);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-transparent text-muted-foreground"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }) {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return <div className={className}>{children}</div>;
}
