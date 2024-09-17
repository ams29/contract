'use client';

import React, { useState } from "react";
import { FileUpload } from "./(components)/file-upload";
import { ContractFields } from "./(components)/contract-fields";
import { AIRecommendations } from "./(components)/ai-recommendations";
import { ProgressTracker } from "./(components)/progress-tracker";
import { SavingsCharts } from "./(components)/savings-charts";
import { ChatBot } from "./(components)/chat-bot";

export default function ContractNegotiationAgent() {
  const [uploadedData, setUploadedData] = useState(null);
  const [contractData, setContractData] = useState(null);

  const handleFileUpload = (data) => {
    setUploadedData(data);
    // Process the data and set initial contract data
    setContractData({
      carrier: "UPS",
      totalSpend: 5750000,
      services: [
        {
          type: "Ground",
          weightRange: "1-5 lbs",
          currentDiscount: "10%",
        },
        {
          type: "Ground",
          weightRange: "6-10 lbs",
          currentDiscount: "12%",
        },
        {
          type: "2nd Day Air",
          weightRange: "1-10 lbs",
          currentDiscount: "15%",
        },
        {
          type: "2nd Day Air",
          weightRange: "11-20 lbs",
          currentDiscount: "18%",
        },
        {
          type: "Next Day Air",
          weightRange: "1-5 lbs",
          currentDiscount: "20%",
        },
        {
          type: "Next Day Air",
          weightRange: "6-10 lbs",
          currentDiscount: "22%",
        },
      ],

      context: data.context,
    });
  };

  const handleContractFieldChange = (field, value) => {
    setContractData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <FileUpload onUpload={handleFileUpload} />

      {uploadedData && (
        <>
          <ContractFields
            contractData={contractData}
            onFieldChange={handleContractFieldChange}
          />

          <AIRecommendations contractData={contractData} />

          <ProgressTracker contractData={contractData} />
          <SavingsCharts contractData={contractData} />
        </>
      )}

      <ChatBot />
    </div>
  );
}
