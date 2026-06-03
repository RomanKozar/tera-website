import Image from "@tiptap/extension-image";
import { ResizableNodeView, mergeAttributes } from "@tiptap/core";

/**
 * TipTap Image + resize, з оновленням DOM при зміні width/height (пресети панелі).
 */
export const NewsImage = Image.extend({
  addNodeView() {
    if (!this.options.resize || !this.options.resize.enabled || typeof document === "undefined") {
      return null;
    }

    const resizeOptions = this.options.resize;
    const extension = this;

    return ({ node, getPos, HTMLAttributes, editor }) => {
      const el = document.createElement("img");
      el.draggable = false;

      const applySizeFromNode = (targetNode: typeof node) => {
        const width = Number(targetNode.attrs.width);
        const height = Number(targetNode.attrs.height);
        if (width > 0) {
          el.style.width = `${width}px`;
        } else {
          el.style.removeProperty("width");
        }
        if (height > 0) {
          el.style.height = `${height}px`;
        } else {
          el.style.removeProperty("height");
        }
      };

      const mergedAttributes = mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
      );
      Object.entries(mergedAttributes).forEach(([key, value]) => {
        if (value != null && key !== "width" && key !== "height") {
          el.setAttribute(key, String(value));
        }
      });
      if (mergedAttributes.src != null) {
        el.src = String(mergedAttributes.src);
      }

      applySizeFromNode(node);

      const { directions, minWidth, minHeight, alwaysPreserveAspectRatio } =
        resizeOptions;

      const nodeView = new ResizableNodeView({
        element: el,
        editor,
        node,
        getPos,
        onResize: (width, height) => {
          el.style.width = `${width}px`;
          el.style.height = `${height}px`;
        },
        onCommit: (width, height) => {
          const pos = getPos();
          if (pos === undefined) {
            return;
          }
          editor
            .chain()
            .setNodeSelection(pos)
            .updateAttributes(extension.name, { width, height })
            .run();
        },
        onUpdate: (updatedNode) => {
          if (updatedNode.type !== node.type) {
            return false;
          }
          applySizeFromNode(updatedNode);
          return true;
        },
        options: {
          directions,
          min: {
            width: minWidth,
            height: minHeight,
          },
          preserveAspectRatio: alwaysPreserveAspectRatio === true,
        },
      });

      const dom = nodeView.dom;
      dom.style.visibility = "hidden";
      dom.style.pointerEvents = "none";
      el.onload = () => {
        dom.style.visibility = "";
        dom.style.pointerEvents = "";
        const pos = getPos();
        if (pos !== undefined) {
          const fresh = editor.state.doc.nodeAt(pos);
          if (fresh) {
            applySizeFromNode(fresh);
          }
        }
      };

      return nodeView;
    };
  },
});
