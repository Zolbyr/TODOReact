"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { nanoid } from "nanoid";

const tabs = ["All", "Active", "Completed"];

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [selectedButton, setSelectedButton] = useState("All");

  const filteredTodos = todos.filter((item) => {
    if (selectedButton === "All") return true;
    if (selectedButton === "Completed") return item.isDone === true;
    if (selectedButton === "Active") return item.isDone === false;
  });

  const completedCount = todos.filter((t) => t.isDone).length;

  return (

<div className="min-h-screen bg-gray-100 flex justify-center pt-20">
  <Card className="w-[420px] p-4 h-fit self-start">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-center mb-4">
            To-Do List
          </h1>

          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                if (value.trim() === "") return;

                setTodos([
                  ...todos,
                  {
                    id: nanoid(),
                    isDone: false,
                    text: value,
                  },
                ]);
                setValue("");
              }}
            >
              Add
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-2 mb-4">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`px-3 ${
                  selectedButton === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedButton(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filteredTodos.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-md"
              >
                <Checkbox
                  checked={item.isDone}
                  onClick={() => {
                    setTodos(
                      todos.map((todo) =>
                        todo.id === item.id
                          ? { ...todo, isDone: !todo.isDone }
                          : todo
                      )
                    );
                  }}
                />

                <p
                  className={`flex-1 ${
                    item.isDone ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.text}
                </p>

                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600"
                  onClick={() =>
                    setTodos(todos.filter((todo) => todo.id !== item.id))
                  }
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          {todos.length > 0 && (
      <div className="flex justify-between items-center mt-5 text-sm text-gras-500">
    <p>
      {completedCount} of {todos.length} tasks completed
    </p>
    
    <Button
      variant="ghost"
      className="text-red-500"
      onClick={() => {
        setTodos(todos.filter((todo) => !todo.isDone ));
      }}
    >
      Clear Completed
    </Button>
    </div>
    )}
          {todos.length === 0 && (
            <p className="text-center text-gray-400 mt-6">
              No tasks yet. Add one above!
            </p>
          )}
        </CardContent>

        <CardDescription className="text-center pt-4">
          Powered by Pinecone academy
        </CardDescription>
      </Card>
    </div>
  );
};

