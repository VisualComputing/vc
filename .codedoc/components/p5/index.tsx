import { ThemedComponentThis } from "@connectv/jss-theme"; // @see [CONNECTIVE JSS Theme](https://github.com/CONNECT-platform/connective-jss-theme)
import { RendererLike } from "@connectv/html"; // @see [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)
import { CodedocTheme } from "@codedoc/core"; // --> Type helper for theme object

import { P5Style, GadgetStyle } from "./style"; // @see tab:style.ts
import { content } from "../../content";
import { config } from "../../config";

export interface P5Options {
  // --> a nice interface for possible props
  sketch: string; // --> sketch location. Note that all props MUST be of type `string`
  id: string;
  width: string;
  height: string;
  padding: string;
  sound: string;
  version: string;
  p5lib: string;
  p5sound: string;
  lib1: string;
  lib2: string;
  lib3: string;
  lib4: string;
  lib5: string;
}

export function P5(
  this: ThemedComponentThis, // --> keep typescript strict typing happy
  options: P5Options, // --> the component props (attributes)
  renderer: RendererLike<any, any>, // --> our beloved renderer
  content: any // --> the content of the component
) {
  const classes = this.theme.classes(P5Style); // --> fetch the theme-based classes
  // custom vars
  let version: string = options.version ? options.version : "1.3.1";
  let repo: string = config.misc?.github?.repo ? "/".concat(config.misc?.github?.repo) : "fixrepovar";
  let p5lib: string = options.p5lib ? repo.concat(options.p5lib) :
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/".concat(version).concat("/p5.min.js");
  let p5sound: string = options.p5sound ? repo.concat(options.p5sound) :
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/".concat(version).concat("/addons/p5.sound.min.js");
  let sound: boolean = options.sound ? options.sound === "true" : options.p5sound ? true : false;
  let libs: string = "<script src=".concat(p5lib).concat("></script>");
  if (sound) {
    libs = libs.concat("<script src=".concat(p5sound).concat("></script>"));
  }
  if (options.lib1) {
    libs = options.lib1.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib1).concat("></script>"))) :
      libs.concat("<script src=".concat(repo.concat(options.lib1).concat("></script>")));
  }
  if (options.lib2) {
    libs = options.lib2.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib2).concat("></script>"))) :
      libs.concat("<script src=".concat(repo.concat(options.lib2).concat("></script>")));
  }
  if (options.lib3) {
    libs = options.lib3.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib3).concat("></script>"))) :
      libs.concat("<script src=".concat(repo.concat(options.lib3).concat("></script>")));
  }
  if (options.lib4) {
    libs = options.lib4.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib4).concat("></script>"))) :
      libs.concat("<script src=".concat(repo.concat(options.lib4).concat("></script>")));
  }
  if (options.lib5) {
    libs = options.lib5.substring(0, 4) == 'http' ? libs.concat("<script src=".concat((options.lib5).concat("></script>"))) :
      libs.concat("<script src=".concat(repo.concat(options.lib5).concat("></script>")));
  }

  let _w: number = Math.abs(parseFloat(options.width ? options.width : '1'));
  let _h: number = Math.abs(parseFloat(options.height ? options.height : '600'));
  let _p: number = Math.abs(parseFloat(options.padding ? options.padding : '10'));
  let width: string = _w > 1 ? (_w + 2 * (_p)).toString().concat('px') : (_w * 100).toString().concat('%');
  let height: string = _h > 1 ? (_h + 2 * (_p)).toString().concat('px') : (_h * 100).toString().concat('%');

  let id: string;
  if (options.sketch) {
    let filename = options.sketch.split("/").pop();
    id = filename!.substr(0, filename!.lastIndexOf("."));
  } else {
    id = options.id ? options.id : "inline";
  }
  const code: string = options.sketch ? "<script src=".concat(repo.concat(options.sketch)).concat("></script>") :
    "<script>".concat((<div>{content}</div>)!.textContent!).concat("</script>");

  const fullScreen = `(function () {
    let fs = fullscreen();
    fullscreen(!fs);
  })();
  `;

  return (
    <div>
      <iframe
        id={`${id}`} class={`${classes.p5} center`} style={`width: ${width}; height: ${height}`}
        srcdoc={`
        <!DOCTYPE html>
        <html>
          <head>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' />
            <style>${GadgetStyle}</style>
            ${libs}
            ${code}
          </head>
          <body>
            <button id="fullScreen" title='Full Screen' onclick='${fullScreen}'>
              <i class='fas fa-expand'></i>
            </button>
          </body>
        </html>
      `}>
      </iframe>

    </div>
  );
}