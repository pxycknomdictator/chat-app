import { Link, useLocation } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { httpUploadProfile } from "../api/axios";

export const Profile = () => {
  const { state } = useLocation();
  const [file, setFile] = useState<File | null>(null);

  const { mutate: fileMutate, isPending } = useMutation({
    mutationFn: async (selectedFile: File) => {
      const formData = new FormData();
      formData.append("profile", selectedFile);

      await httpUploadProfile(formData);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    fileMutate(file);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <section className="w-2xl">
        <center className="avatar flex items-center justify-center">
          <div className="w-36 rounded-full">
            <img src={state.avatar} crossOrigin="anonymous" />
          </div>
        </center>
        <div>
          <input
            type="file"
            className="file-input file-input-ghost w-full max-w-xs"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={handleUpload}
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
        <div>
          <h2 className="text-2xl">{state.username}</h2>
          <h3 className="text-xs">{state.email}</h3>
        </div>
        <Link to="/" className="btn btn-primary">
          Go back
        </Link>
      </section>
    </div>
  );
};
