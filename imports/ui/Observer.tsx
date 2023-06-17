import React, { useEffect, useRef } from "react";

interface ObserverProps {
  targetRef: React.RefObject<HTMLElement>;
  onMutation: (element: HTMLElement, data: string) => void;
}

const Observer: React.FC<ObserverProps> = ({ targetRef, onMutation }) => {
  const isUpdatingText = useRef(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        const { type, addedNodes, target } = mutation;
        if (type === "childList") {
          Array.from(addedNodes).forEach((node) => {
            traverseNode(node);
          });
        } else if (type === "characterData") {
          if (
            target.parentElement?.classList.contains("__t") &&
            target instanceof CharacterData && // Проверяем тип
            !isUpdatingText.current
          ) {
            onMutation(target.parentElement, target.data || "");
          }
        }
      });
    });

    const traverseNode = (node: Node) => {
      if (node instanceof HTMLElement && node.classList.contains("__t")) {
        const positionElement = node;
        const position = positionElement.textContent || "";

        onMutation(positionElement, position);
      }

      if (node.childNodes && node.childNodes.length > 0) {
        Array.from(node.childNodes).forEach((childNode) => {
          traverseNode(childNode);
        });
      }
    };

    const config: MutationObserverInit = {
      childList: true,
      characterData: true,
      subtree: true,
    };

    if (targetRef.current) {
      observer.observe(targetRef.current, config);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetRef, onMutation]);

  return null;
};

export { Observer };
