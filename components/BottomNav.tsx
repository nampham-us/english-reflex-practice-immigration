// components/BottomNav.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaCog } from "react-icons/fa";

const BottomNav: React.FC = () => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderTop: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
<Link href="/">
          <FaHome size={24} color={isActive("/") ? "#007bff" : "#888"} />
      </Link>
<Link href="/settings">
          <FaCog size={24} color={isActive("/settings") ? "#007bff" : "#888"} />
      </Link>
    </div>
  );
};

export default BottomNav;
