import { useEffect, useRef } from 'react';

const Observer = ({ targetRef, onMutation }) => {
  const isUpdatingText = useRef(false); // Флаг для отслеживания обновления текста

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          addedNodes.forEach((node) => {
            traverseNode(node);
          });
        } else if (mutation.type === 'characterData') {
          if (mutation.target.parentElement.classList.contains('__t')) {
            // Проверяем, не обновляется ли уже текст элемента
            if (!isUpdatingText.current) {
              onMutation(mutation.target.parentElement, mutation.target.data);
            }
          }
        }
      });
    });

    const traverseNode = (node) => {
      if (node instanceof HTMLElement && node.classList.contains('__t')) {
        const positionElement = node;
        const position = positionElement.textContent;

        onMutation(positionElement, position);
      }

      if (node.childNodes && node.childNodes.length > 0) {
        Array.from(node.childNodes).forEach((childNode) => {
          traverseNode(childNode);
        });
      }
    };

    const config = {
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

  // Функция для обновления текста элемента без вызова обработчика мутаций
  const updateText = (element, newText) => {
    isUpdatingText.current = true;
    element.textContent = newText;
    isUpdatingText.current = false;
  };

  return null;
};

export { Observer };
