import { Movie } from "@/app/types/movie";
import { ImageProps } from "next/image";
import { expect, it, vi, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import userEvent from "@testing-library/user-event";
import useIsDesktop from "@/hooks/useIsDesktop";

vi.mock("next/image", () => ({
  default: ({ priority, ...props }: ImageProps) => <img {...props} />,
}));

vi.mock("@/hooks/useIsDesktop");

vi.mock("@/hooks/useMovieMutations", () => ({
  useMovieMutations: () => ({
    handleBookmark: vi.fn(),
    handleFavorite: vi.fn(),
  }),
}));

vi.mock("./MovieInteractionDropdown", () => ({
  default: () => <div data-testid="dropdown" />,
}));

vi.mock("./MovieInteractionButtons", () => ({
  default: () => <div data-testid="hover-buttons" />,
}));

vi.mock("../MoviePage/Hero/_components/AuthDialog", () => ({
  default: () => null,
}));

const movie = {
  id: 1,
  title: "Inception",
  poster_path: "/abc.jpg",
  vote_average: 8.766,
} as Movie;

function setup(overrides: Partial<Movie> = {}) {
  return render(
    <MovieCard
      movie={{ ...movie, ...overrides }}
      slug="inception-1"
      isFavorite={false}
      isBookmarked={false}
    />,
  );
}

describe("MovieCard", () => {
  beforeEach(() => {
    vi.mocked(useIsDesktop).mockReturnValue({ isDesktopLayout: true });
  });
  it("shows title", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Inception" }),
    ).toBeInTheDocument();
  });

  it("shows rating rounded to one decimal", () => {
    setup();
    expect(screen.getByText("8.8")).toBeInTheDocument();
    expect(screen.queryByText("TBD")).not.toBeInTheDocument();
  });

  it("shows TBD when rating equals 0 ", () => {
    setup({ ...movie, vote_average: 0 });
    expect(screen.getByText("TBD")).toBeInTheDocument();
  });

  it("shows TBD when theres no rating ", () => {
    setup({ ...movie, vote_average: undefined });
    expect(screen.getByText("TBD")).toBeInTheDocument();
  });

  it("shows image from posterPath", () => {
    setup();
    expect(screen.getByAltText("Inception")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/abc.jpg",
    );
  });

  it("shows placeholder if no posterPath", () => {
    setup({ ...movie, poster_path: undefined });
    expect(screen.getByAltText("Inception")).toHaveAttribute(
      "src",
      "/placeholder.png",
    );
  });

  it("link", () => {
    setup();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/movie/inception-1",
    );
  });

  describe("desktop layout interaction buttons", () => {
    it("doesnt show buttons if the card isnt hovered", () => {
      setup();
      expect(screen.queryByTestId("hover-buttons")).not.toBeInTheDocument();
    });

    it("doesnt show dropdown if desktop layout", () => {
      setup();
      expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
    });

    it("shows interaction buttons when hovered", async () => {
      const user = userEvent.setup();

      const { container } = setup();
      await user.hover(container.firstElementChild!);
      expect(screen.getByTestId("hover-buttons")).toBeInTheDocument();
      await user.unhover(container.firstElementChild!);
      expect(screen.queryByTestId("hover-buttons")).not.toBeInTheDocument();
    });
  });

  describe("mobile layout interaction buttons", () => {
    beforeEach(() => {
      vi.mocked(useIsDesktop).mockReturnValue({ isDesktopLayout: false });
    });
    it("displays buttons dropdown", () => {
      setup();
      expect(screen.queryByTestId("dropdown")).toBeInTheDocument();
    });

    it("doesnt show desktop buttons", () => {
      setup();
      expect(screen.queryByTestId("hover-buttons")).not.toBeInTheDocument();
    });

    it("doesnt show desktop buttons when hovered", async () => {
      const user = userEvent.setup();
      const { container } = setup();

      await user.hover(container.firstElementChild!);
      expect(screen.queryByTestId("hover-buttons")).not.toBeInTheDocument();
    });
  });
});
