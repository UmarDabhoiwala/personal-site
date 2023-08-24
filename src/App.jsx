import { getProject } from "@theatre/core";

// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";

import Experience from "./experience/Experience";
import Media from "react-media";

import pageAnimationsLarge from "./animation-states/pageAnimationsDesk.theatre-project-state.json";
import pageAnimationsMedium from "./animation-states/pageAnimationsTab.theatre-project-state.json";
import pageAnimationsSmall from "./animation-states/pageAnimationsMob.theatre-project-state.json";

// studio.extend(extension);
// studio.initialize();

const App = () => {
  const pageAnimationsDesk = getProject("pageAnimationsDesk", {
    state: pageAnimationsLarge,
  }).sheet("animation", "desktop");

  const pageAnimationsTab = getProject("pageAnimationsTab", {
    state: pageAnimationsMedium,
  }).sheet("animation", "tablet");

  const pageAnimationsMob = getProject("pageAnimationsMob", {
    state: pageAnimationsSmall,
  }).sheet("animation", "mobile");

  return (
    <div className="container">
      <Media
        queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 1080px)",
          large: "(min-width: 1200px)",
        }}
      >
        {(matches) => (
          <>
            {matches.small && <Experience sheet={pageAnimationsMob} />}
            {matches.medium && <Experience sheet={pageAnimationsTab} />}
            {matches.large && <Experience sheet={pageAnimationsDesk} />}
          </>
        )}
      </Media>
    </div>
  );
};

export default App;
