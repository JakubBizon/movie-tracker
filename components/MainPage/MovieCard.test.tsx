import { Movie } from "@/app/types/movie";
import { ImageProps } from "next/image";
import { expect, it, vi, describe, beforeEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import userEvent from "@testing-library/user-event";
import useIsDesktop from "@/hooks/useIsDesktop";
import { useMovieMutations } from "@/hooks/useMovieMutations";

vi.mock("next/image", () => ({
  default: ({ priority, ...props }: ImageProps) => <img {...props} />,
}));

vi.mock("@/hooks/useIsDesktop");

vi.mock("@/hooks/useMovieMutations");

const handleBookmark = vi.fn();
const handleFavorite = vi.fn();

vi.mock("@/app/actions/movieActions", () => ({
  toggleBookmark: vi.fn(),
  toggleFavorite: vi.fn(),
}));

vi.mock("./MovieInteractionDropdown", () => ({
  default: ({
    onBookmark,
    onFavorite,
  }: {
    onBookmark: () => void;
    onFavorite: () => void;
  }) => (
    <div data-testid="dropdown">
      <button type="button" onClick={() => onBookmark()}>
        dropdown-bookmark
      </button>
      <button type="button" onClick={() => onFavorite()}>
        dropdown-favorite
      </button>
    </div>
  ),
}));

vi.mock("./MovieInteractionButtons", () => ({
  default: ({
    onBookmark,
    onFavorite,
  }: {
    onBookmark: () => void;
    onFavorite: () => void;
  }) => (
    <div data-testid="hover-buttons">
      <button type="button" onClick={() => onBookmark()}>
        hover-bookmark
      </button>
      <button type="button" onClick={() => onFavorite()}>
        hover-favorite
      </button>
    </div>
  ),
}));

vi.mock("../MoviePage/Hero/_components/AuthDialog", () => ({
  default: ({
    open,
    onOpenChange,
    type,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: string;
  }) => (
    <div data-testid="auth-dialog" data-open={String(open)} data-type={type}>
      <button type="button" onClick={() => onOpenChange(false)}>
        close-dialog
      </button>
    </div>
  ),
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
    vi.clearAllMocks();
    vi.mocked(useIsDesktop).mockReturnValue({ isDesktopLayout: true });
    vi.mocked(useMovieMutations).mockReturnValue({
      handleBookmark,
      handleFavorite,
      isBookmarkPending: false,
      isFavoritePending: false,
    });
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
    setup({ vote_average: 0 });
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

    it("handles favorite and bookmark buttons clicks", async () => {
      const user = userEvent.setup();
      const { container } = setup();

      await user.hover(container.firstElementChild!);

      expect(screen.getByTestId("hover-buttons")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "hover-bookmark" }));

      expect(handleBookmark).toHaveBeenCalledTimes(1);
      expect(handleFavorite).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole("button", { name: "hover-favorite" }));

      expect(handleFavorite).toHaveBeenCalledTimes(1);
    });
  });

  describe("mobile layout dropdown interaction buttons", () => {
    beforeEach(() => {
      vi.mocked(useIsDesktop).mockReturnValue({ isDesktopLayout: false });
    });
    it("displays buttons dropdown", () => {
      setup();
      expect(screen.getByTestId("dropdown")).toBeInTheDocument();
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

    it("handles favorite and bookmark buttons clicks", async () => {
      const user = userEvent.setup();
      setup();

      await user.click(
        screen.getByRole("button", { name: "dropdown-bookmark" }),
      );
      expect(handleBookmark).toHaveBeenCalledTimes(1);
      expect(handleFavorite).not.toHaveBeenCalled();

      await user.click(
        screen.getByRole("button", { name: "dropdown-favorite" }),
      );
      expect(handleFavorite).toHaveBeenCalledTimes(1);
      expect(handleBookmark).toHaveBeenCalledTimes(1);
    });
  });

  describe("AuthDialog", () => {
    it("its closed by default and gets proper dialog type", () => {
      setup();
      expect(screen.getByTestId("auth-dialog")).toHaveAttribute(
        "data-open",
        "false",
      );
      expect(screen.getByTestId("auth-dialog")).toHaveAttribute(
        "data-type",
        "interaction",
      );
    });

    it("opens when the hook asks for auth", () => {
      setup();
      const dialog = screen.getByTestId("auth-dialog");
      expect(dialog).toHaveAttribute("data-open", "false");

      const onAuthRequired = vi.mocked(useMovieMutations).mock.calls[0][2];
      expect(onAuthRequired).toBeDefined();
      act(() => onAuthRequired?.());

      expect(dialog).toHaveAttribute("data-open", "true");
    });

    it("closes when user clicks close button", async () => {
      setup();
      const user = userEvent.setup();
      const dialog = screen.getByTestId("auth-dialog");

      const onAuthRequired = vi.mocked(useMovieMutations).mock.calls[0][2];
      expect(onAuthRequired).toBeDefined();
      act(() => onAuthRequired?.());

      expect(dialog).toHaveAttribute("data-open", "true");

      const button = screen.getByRole("button", { name: "close-dialog" });

      await user.click(button);

      expect(dialog).toHaveAttribute("data-open", "false");
    });
  });
});
