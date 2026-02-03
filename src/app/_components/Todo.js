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

const tabs = ["All", "Completed", "Incompleted"];

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [value, SetValue] = useState("");
  const [selectedButton, setSelectedButton] = useState("All");

  return (
    <div className="h-screen w-screen bg-white flex justify-center mt-20">
      <Card className="w-[400px] h-fit">
        <CardHeader>
          <h1 className="text-[25px] pl-30 mb-5 mr-5">To-do List</h1>
          <div className="flex gap-4">
            <Input
              className="flex-1"
              value={value}
              onChange={(e) => {
                SetValue(e.target.value);
              }}
            />

            <Button
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
                SetValue("");
              }}
              className={"bg-blue-500"}
            >
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-fit gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className="flex-1"
                style={{
                  backgroundColor:
                    tab === selectedButton ? "#3C82F6" : "transparent",
                }}
                onClick={() => {
                  setSelectedButton(tab);
                }}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-5">
            {todos
              .filter((items) => {
                if (selectedButton === "All") return true;
                if (selectedButton === "Completed")
                  return items.isDone === true;
                ``;
                return items.isDone === false;
              })
              .map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex gap-4 items-center">
                    <Checkbox
                      checked={item.isDone}
                      onClick={() => {
                        const newTodos = todos.map((todo) => {
                          if (todo.id !== item.id) return todo;
                          return {
                            isDone: !item.isDone,
                            text: item.text,
                            id: item.id,
                          };
                        });

                        setTodos(newTodos);
                      }}
                    />
                    <p className="flex-1">{item.text}</p>

                    <Button
                      onClick={() => {
                        setTodos(todos.filter((todo) => todo.id !== item.id));
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
        <CardDescription>
          <h1 className="flex justify-center"> No task yet. Add one above!</h1>
          <h1 className="flex justify-center pt-5">
            Powered by Pinecone academy
          </h1>
        </CardDescription>
      </Card>
    </div>
  );
};
