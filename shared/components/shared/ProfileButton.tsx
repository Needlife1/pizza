import { useSession } from "next-auth/react";
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickSignIn, className }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Увійти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профіль
          </Button>
        </Link>
      )}
    </div>
  );
};