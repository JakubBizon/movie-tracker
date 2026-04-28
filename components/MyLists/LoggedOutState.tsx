import Link from "next/link";

export default function LoggedOutState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] text-center">
      <h2 className="text-2xl font-bold mb-4">Log in to see your lists</h2>
      <p className="text-gray-300 mb-4">
        Your favorite movies and bookmarks will be displayed after logging in
      </p>
      <Link
        href="/login"
        className="bg-primary text-white px-6 py-2 rounded-md mb-4"
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
