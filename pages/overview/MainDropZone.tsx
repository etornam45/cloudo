"use client";

import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { toast } from "sonner";
export default function DragAndDrop() {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [files, setFiles] = useState<any>([]);

    function handleChange(e: any) {
        e.preventDefault();
        console.log("File has been added");
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            for (let i = 0; i < e.target.files["length"]; i++) {
                setFiles((prevState: any) => [...prevState, e.target.files[i]]);
            }
        }
    }

    function handleSubmitFile(e: any) {
        if (files.length === 0) {
            // no file has been submitted
            toast("No file has been submitted", {
                description: "Please select a file to upload",
                icon: <CrossCircledIcon color="red" />,
            })
        } else {
            // write submit logic here
            toast("File has been submitted", {
                description: "Your file has been submitted successfully",
                icon: <CheckCircledIcon color="green" />,
            })
        }
    }

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
            }
        }
    }

    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile(fileName: any, idx: any) {
        const newArr = [...files];
        newArr.splice(idx, 1);
        setFiles([]);
        setFiles(newArr);
    }

    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }

    return (
        <>
            <div className="flex items-center justify-center p-4">
                <form
                    className="flex flex-col items-center w-full relative justify-center border-2 border-dashed border-gray-400 rounded-lg h-60 "
                    onDragEnter={handleDragEnter}
                    onSubmit={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                >
                    {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
                    <input
                        placeholder="fileInput"
                        className="hidden"
                        ref={inputRef}
                        type="file"
                        multiple={true}
                        onChange={handleChange}
                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    />

                    <p style={{ display: files.length > 0 ? "none" : "block" }}>
                        Drag & Drop files or{" "}
                        <span
                            className="font-bold text-blue-600 cursor-pointer"
                            onClick={openFileExplorer}
                        >
                            <u>Select files</u>
                        </span>{" "}
                        to upload
                    </p>

                    <div style={{ display: files.length > 0 ? "grid" : "none", gridAutoColumns: "center", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "10px" }} className="overflow-hidden p-4 h-full w-full">
                        <p>
                            <span
                                className="font-bold text-blue-600 cursor-pointer"
                                onClick={openFileExplorer}
                            >
                                <u>Select more files</u>
                            </span>{" "}
                        </p>

                        {files.map((file: any, idx: any) => (
                            <div key={idx} className="flex flex-row space-x-5">
                                <span>{file.name}</span>
                                <span
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => removeFile(file.name, idx)}
                                >
                                    remove
                                </span>
                            </div>
                        ))}


                    </div>

                </form>
            </div>
            <div
                style={{ display: files.length > 0 ? "block" : "none" }}
                className=" bottom-0 w-full p-4 backdrop-blur-md bg-white/35 border-t-2">
                <button
                    className="bg-black rounded-lg p-2 w-full"
                    onClick={handleSubmitFile}
                >
                    <span className="p-2 text-white">Submit</span>
                </button>
            </div>
        </>
    );
}