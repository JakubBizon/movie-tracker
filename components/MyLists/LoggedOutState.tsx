import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export default function LoggedOutState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="dark:text-gray-300 text-gray-600 mb-4">{description}</p>
      <Link
        href="/login"
        className="bg-primary text-white px-10 py-2 rounded-md mb-4"
      >
        Log in
      </Link>
      <div className="flex gap-2">
        <div>New here?</div>
        <Link className="text-primary" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
