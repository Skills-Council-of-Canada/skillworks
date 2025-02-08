
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ConversationList } from "@/components/employer/messages/ConversationList";
import { MessageThread } from "@/components/employer/messages/MessageThread";

const MessagesPage = () => {
  const location = useLocation();
  const isConversationSelected = location.pathname.includes("/messages/");

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={isConversationSelected ? "hidden md:block" : ""}>
          <ConversationList />
        </div>
        {isConversationSelected && (
          <div className="md:col-span-2">
            <MessageThread />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
