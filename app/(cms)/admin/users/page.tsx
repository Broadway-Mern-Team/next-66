import { Suspense } from "react";
import AllUserList from "@/components/users/AllUserList";

export default function UserListPage() {
  return (
    <Suspense fallback={null}>
      <AllUserList />
    </Suspense>
  );
}
