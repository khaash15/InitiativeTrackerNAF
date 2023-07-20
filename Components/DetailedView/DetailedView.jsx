import React, { useRef, useState } from "react";
import "./DetailedView.css";
import CommentCard from "../CommentCard/CommentCard";
import { useLayoutEffect } from "react";
import { useContext } from "react";
import DataContext from "../../Data/DataContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { ExportToExcel } from "../../schemas/ExportToExcel";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import TextBox from "../TextBox/TextBox";
import SaveIcon from "@mui/icons-material/Save";
const DetailedView = () => {
  const ddData = [{ text: "A4", value: "size-a4" }];

  const [layoutSelection, setLayoutSelection] = useState({
    text: "A4",
    value: "size-a4",
  });

  const [comment, setComment] = useState("");

  const updatePageLayout = (event) => {
    setLayoutSelection(event.target.value);
  };

  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  const { id } = useParams();
  const {
    authMiddleware,
    data,
    setData,
    summary,
    setSummary,
    list,
    setList,
    auth,
    toggle,
    setToggle,
    commonText,
    setCommonText,
    discription,
    setDescription,
  } = useContext(DataContext);

  useLayoutEffect(() => {
    authMiddleware();
    // console.log(id);
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7265/api/Idea/${id}`).then((response) => {
      setData(response.data);
      setSummary(response.data.shortDescription);
      setDescription(response.data.longDescription);
      // console.log(response.data);
    });
    axios.get("https://localhost:7265/api/Comments").then((response) => {
      setList(response.data);
    });
  }, []);

  const EditDetails = () => {
    setToggle(false);
  };

  const save = () => {
    setToggle(true);
    axios.put(`https://localhost:7265/api/Idea`, {
      ...data,
      shortDescription: summary,
      longDescription: discription,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7265/api/Comments", {
        taskid: id,
        comment: comment,
        userId: auth.id,
      })
      .then((response) => {
        axios.get("https://localhost:7265/api/Comments").then((response) => {
          setList(response.data);
          setComment("");
        });
        console.log(response.data);
      });
  };
  const [data1, setData1] = React.useState([]);
  const fileName = "mysamplefile"; // here enter filename for your excel file

  React.useEffect(() => {
    // const fetchData = () =>{
    //  axios.get('https://localhost:7265/api/Idea/excel').then(r => setData1(r.data) )
    // }
    // fetchData()
  }, []);
  return (
    <>
      <PDFExport ref={pdfExportComponent}>
        <div className={`pdf-page ${layoutSelection.value}`}>
          <div className="detailed-idea-container">
            <div className="detailed-content">
              <div className="detailed-content-main">
                <div className="EditFlex">
                  <h2
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                  >
                    {data.title}
                  </h2>
                  <EditIcon onClick={EditDetails} />
                  <SaveIcon onClick={save} />
                </div>
                <div className="submit-idea-details">
                  <SimCardDownloadIcon apiData={data1} fileName={fileName} />
                  <Tooltip title="Download">
                    <CloudDownloadIcon />
                  </Tooltip>
                </div>
                <div className="detailed-all">
                  <div>
                    <h4>Owner</h4>
                    <div className="NAME-CARD">
                      <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />
                      <p>{data.user}</p>
                    </div>
                  </div>
                  <div>
                    <h4>Contributors</h4>
                    <div className="total-container">
                      <div className="contributors-container">
                        <div className="NAME-CARD"></div>
                        <div className="NAME-CARD"></div>
                        <div className="NAME-CARD"></div>
                        <div className="NAME-CARD"></div>
                        <div className="NAME-CARD"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4>Created on</h4>
                    <p>{data.ideaCreatedDate}</p>
                  </div>
                  <div className="detailed-summary">
                    <h4>Summary</h4>
                    <p>
                      {/* {data.shortdescription} */}
                      <TextBox
                        mihight={64}
                        mxhight={64}
                        dis={toggle}
                        value={summary}
                        setValue={setSummary}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="long-description">
                <h2>Description</h2>

                <p>
                  <TextBox
                    mihight={124}
                    mxhight={124}
                    dis={toggle}
                    value={discription}
                    setValue={setDescription}
                  />
                </p>
              </div>
              <div className="detailed-idea-status">
                <h2>Status</h2>
                <div>
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png"
                      className="img-icon"
                    />
                    <p>{data.status}</p>
                  </div>
                  <div className="approver-status">
                    <p>Start Date</p>
                    <p>{data?.startDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailed-comments">
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    value={comment}
                    placeholder="Enter Comments"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </form>
                <div>
                  {list.map((l) => {
                    console.log(l);
                    return (
                      <CommentCard
                        name={l.user}
                        comments={l.comments}
                        commentsDate={l.commentsDate}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PDFExport>
    </>
  );
};

export default DetailedView;
