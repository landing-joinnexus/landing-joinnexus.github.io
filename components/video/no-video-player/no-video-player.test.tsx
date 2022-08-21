import { render, screen } from "@testing-library/react"
import NoVideoPlayer from "./no-video-player"

describe('no-video-player', () => {
  beforeEach(() => {
    render(<NoVideoPlayer />);
  });

  it('should render no-video-player', async () => {
    expect(await screen.findByTestId("no-video-player")).toBeDefined();
  })
})