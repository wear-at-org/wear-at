import React, { useState, useCallback } from 'react';
import arrRightOnly from 'assets/img/arr-right-only.png';
import xBtn from 'assets/img/x-btn.png';

const Tip = ({ tipArray }) => {
  const [activeId, setActiveId] = useState(0);
  const activeTip = useCallback((id) => {
    console.log(id);
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
              <div className="tip-item" key={`tip-${id}`} onClick={() => activeTip(id)}>
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
