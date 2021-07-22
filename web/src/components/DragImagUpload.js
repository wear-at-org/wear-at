import React, { useCallback, useRef, useState, useEffect } from 'react';
import imgIcon from 'assets/img/img-icon.svg';
const DragImagUpload = ({ files, setFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [delFiles, setDelFiles] = useState([]);
  const dragRef = useRef(null);
  const fileId = useRef(0);

  const blobToData = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const onChangeFiles = useCallback(
    async (e) => {
      let tempFiles = files;
      let selectFiles = [];
      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        let reader = new FileReader();
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
            imgPath: await blobToData(file),
          },
        ];
      }
      console.log(tempFiles);
      setFiles(tempFiles);
    },
    [files, setFiles],
  );

  const handleFilterFile = useCallback(
    (id) => {
      setFiles(files.filter((file) => file.id !== id));
    },
    [files, setFiles],
  );

  const deleteFiles = () => {
    delFiles.forEach((item) => {
      handleFilterFile(item.id);
    });
  };

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="DragDrop">
      <input type="file" id="fileUpload" style={{ display: 'none' }} multiple={true} onChange={onChangeFiles} />

      <div className={`d-flex mb32 width-100 ${files.length > 0 ? 'x-eq' : 'x-center'}`}>
        <div className="">
          <label htmlFor="fileUpload">
            <div className="btn-style1 type-black b-center center width-110 mr12">
              <p className="btn-font font-white">파일선택</p>
            </div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="" onClick={deleteFiles}>
            <div className="btn-style1 type-error b-center center width-110 mr12 noneborder">
              <p className="btn-font font-white">선택삭제</p>
            </div>
          </div>
        )}
      </div>

      <label
        className={`${isDragging ? 'DragDrop-File dragging' : 'DragDrop-File'} ${files.length > 0 && 'hidden'}`}
        htmlFor="fileUpload"
        ref={dragRef}
      >
        <div className="mb8">
          <img src={imgIcon} alt="" />
        </div>

        <h5 className="small color-graybdbd tc">
          회원님의 스타일을 참고할 만한
          <br /> 이미지를 업로드해주세요
        </h5>
      </label>

      <div className="DragDrop-Files">
        {files.length > 0 &&
          files.map((file) => {
            const { id } = file;

            return (
              <>
                <div className="img-item mb20" key={id}>
                  <div className="mb20">
                    <img src={file.imgPath} alt="" />
                  </div>

                  <div className="chkbox-con">
                    {file.id}
                    <input
                      type="checkbox"
                      className="input-style-checkbox"
                      checked={delFiles.findIndex((i) => i.id === file.id) > -1}
                      onChange={() => {
                        console.log(delFiles);
                        console.log(file.id);
                        delFiles.findIndex((i) => i.id === file.id) === -1
                          ? setDelFiles([...delFiles, file])
                          : setDelFiles([...delFiles.filter((i) => i.id !== file.id)]);
                      }}
                    />
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default DragImagUpload;
