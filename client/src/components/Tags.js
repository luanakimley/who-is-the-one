import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import Pagination from "./Pagination";
import { useRef } from "react";
import AddBox from "./AddBox";
import TagBox from "./TagBox";
import DeleteButton from "./DeleteButton";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [cookies] = useCookies(["userId"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const limit = 12;
  const inputRef = useRef(null);

  useEffect(() => {
    async function getTags() {
      const tags = await axios.get(
        `${SERVER_HOST}/tags_by_users/${cookies.userId}?limit=${limit}&page=${currentPage}`
      );
      setTags(tags.data);
    }
    getTags();

    async function getTagsCount() {
      const count = await axios.get(
        `${SERVER_HOST}/tags_count/${cookies.userId}`
      );
      setListLength(count.data);
    }

    getTagsCount();
  }, [currentPage, tags, listLength, cookies.userId]);

  const handleCurrentPage = (data) => {
    setCurrentPage(data);
  };

  const addTag = (e, tagName) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("userId", cookies.userId);
    formData.append("tagDescription", tagName);

    axios
      .post(`${SERVER_HOST}/insert_tag_for_user`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        //Reset TagBox
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.error("Error adding tag:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-4 mb-2">
        <div className="d-flex w-100 h-100">
          <div className="w-50 m-5 align-self-center">
           <AddBox params= {{backButtonTitle: {href: "", text: "Add Tag"}, objectText: "Tag", callback: addTag}}/>
          </div>
          <div className="w-50 m-5 align-self-center">
            <div className="row">
              {tags.length
                ? tags.map((tag) => (
                <div key={tag.tag_id} className="col col-lg-4 p-4">
                      <TagBox
                        tag={tag}
                        listLength={listLength}
                        limit={limit}
                        setCurrentPage={handleCurrentPage}
                        />
                    </div>
                  ))
                : null}
            </div>
            <div className="pagination-container text-center">
              <Pagination
                currentPage={currentPage}
                listLength={listLength}
                limit={limit}
                pageChange={handleCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
