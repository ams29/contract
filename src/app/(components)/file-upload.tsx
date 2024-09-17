'use client';

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

export function FileUpload({ onUpload }: { onUpload: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [contractContext, setContractContext] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-gray-800 rounded-xl">
      <h2 className="text-2xl font-bold text-white">
        Upload Contract Data
      </h2>
      <p className="text-sm text-gray-300">
        Upload your Excel file containing contract details and parcel level data
        (PLD) to begin the AI-powered analysis.
      </p>
      <div
        {...getRootProps()}
        className={`flex items-center justify-center w-full h-32 px-4 transition bg-gray-700 border-2 border-dashed border-gray-500 rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${
          isDragActive ? "border-blue-500" : ""
        }`}
      >
        <input {...getInputProps()} accept=".xlsx,.xls,.csv" />
        {isDragActive ? (
          <p className="text-sm text-gray-300">
            Drop the files here ...
          </p>
        ) : (
          <div className="flex flex-col items-center">
            <UploadIcon className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-300">
              Drag & drop files here, or click to select files
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">
            {file.name}
          </span>
        </div>
      )}

      <Textarea
        placeholder="Provide context about your contract to help AI negotiate better..."
        value={contractContext}
        onChange={(e) => setContractContext(e.target.value)}
        className="w-full mt-4 bg-gray-700 text-white border-gray-600"
        rows={4}
      />

      <Button
        onClick={handleUpload}
        disabled={!file}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        <UploadIcon className="mr-2 h-5 w-5" />
        Process Data
      </Button>
    </div>
  );
}
