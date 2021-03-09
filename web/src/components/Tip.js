import React, { useState, useCallback } from 'react';

const Tip = ({ tipArray }) => {
  const [activeId, setActiveId] = useState(0);
  const activeTip = useCallback((id) => {
    if (id === activeId) { setActiveId(0); } else {
      setActiveId(id);
    }
  }, [activeId]);

  return (
    <>
      {
          tipArray.map((item) => {
            const { id, title, content } = item;
            return (
              <div className={activeId === id ? 'tip-item active' : 'tip-item'} onClick={() => activeTip(id)} key={`tip-item-${id}`}>
                <div className="tip-title">
                  <h4>
                    {title}
                  </h4>
                </div>

                <div className={activeId === id ? 'tip-content active' : 'tip-content'}>
                  <h5>
                    {content && content.split('\n').map((line) => (
                      <>
                        {line}
                        <br />
                      </>
                    ))}
                  </h5>
                </div>
              </div>
            );
          })
        }
    </>
  );
};

export default Tip;
