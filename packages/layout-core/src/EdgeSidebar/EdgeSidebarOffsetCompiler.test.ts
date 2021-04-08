import { HeaderBuilder } from "../Header/HeaderBuilder";
import { EdgeSidebarBuilder } from "./EdgeSidebarBuilder";
import { EdgeSidebarOffsetCompiler } from "./EdgeSidebarOffsetCompiler";

describe("EdgeSidebarOffsetCompiler", () => {
  it("return empty if no header", () => {
    const compiler = EdgeSidebarOffsetCompiler({
      edgeSidebar: new EdgeSidebarBuilder({
        config: {
          md: {
            variant: "permanent",
            width: 256,
          },
        },
      }),
    });
    expect(compiler.getSxHeight()).toEqual({});
  });

  it("return correct offset height", () => {
    const header = new HeaderBuilder({
      config: {
        xs: {
          position: "sticky",
          height: 56,
          clipped: true,
        },
      },
    });
    const edgeSidebar = new EdgeSidebarBuilder({
      config: {
        sm: {
          variant: "permanent",
          width: 256,
        },
      },
    });
    edgeSidebar.id = "leftEdgeSidebar";
    header.effectedBy = { leftEdgeSidebar: edgeSidebar };
    const compiler = EdgeSidebarOffsetCompiler({
      header,
      edgeSidebar,
    });
    expect(compiler.getSxHeight()).toEqual({
      height: {
        xs: "56px",
        sm: "56px",
      },
    });
  });

  it("only has height if clipped", () => {
    const header = new HeaderBuilder({
      config: {
        xs: {
          position: "sticky",
          height: 56,
          clipped: true,
        },
        md: {
          position: "fixed",
          height: 64,
        },
        lg: {
          position: "relative",
          height: 64,
          clipped: true,
        },
      },
    });
    const edgeSidebar = new EdgeSidebarBuilder({
      config: {
        sm: {
          variant: "permanent",
          width: 256,
        },
        lg: {
          variant: "persistent",
          width: 256,
          persistentBehavior: "fit",
        },
      },
    });
    edgeSidebar.id = "leftEdgeSidebar";
    header.effectedBy = { leftEdgeSidebar: edgeSidebar };

    const compiler = EdgeSidebarOffsetCompiler({
      header,
      edgeSidebar,
    });
    expect(compiler.getSxHeight()).toEqual({
      height: {
        xs: "56px",
        sm: "56px",
        md: 0,
        lg: "64px",
      },
    });
  });

  it("has zero height if clippped on another sidebar", () => {
    const header = new HeaderBuilder({
      config: {
        xs: {
          position: "sticky",
          height: 56,
          clipped: {
            rightEdgeSidebar: true,
          },
        },
      },
    });
    const edgeSidebar = new EdgeSidebarBuilder({
      config: {
        sm: {
          variant: "permanent",
          width: 256,
        },
      },
    });
    edgeSidebar.id = "leftEdgeSidebar";
    header.effectedBy = { leftEdgeSidebar: edgeSidebar };
    const compiler = EdgeSidebarOffsetCompiler({
      header,
      edgeSidebar,
    });
    expect(compiler.getSxHeight()).toEqual({
      height: { xs: 0, sm: 0 },
    });
  });
});
