'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, MinusCircle, DollarSign, Percent } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContractData {
  carrier: string;
  totalSpend: number;
  services: Array<{
    type: string;
    weightRange: string;
    currentDiscount: string;
  }>;
}

interface ContractFieldsProps {
  contractData: ContractData;
  onFieldChange: (field: string, value: string | number | Array<any>) => void;
}

export function ContractFields({ contractData, onFieldChange }: ContractFieldsProps) {
  const [totalSpend, setTotalSpend] = useState<number>(contractData.totalSpend);

  useEffect(() => {
    const newTotalSpend = calculateTotalSpend();
    setTotalSpend(newTotalSpend);
    onFieldChange("totalSpend", newTotalSpend);
  }, [contractData.services, onFieldChange]);

  const fieldAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSendNewTerms = () => {
    toast({
      title: "New Terms Sent",
      description:
        "Your updated contract terms have been sent to the carrier for review.",
    });
    console.log("Sending new terms:", contractData);
  };

  const handleAddService = () => {
    const newServices = [
      ...contractData.services,
      { type: "", weightRange: "", currentDiscount: "" },
    ];

    onFieldChange("services", newServices);
  };

  const handleRemoveService = (index: number) => {
    const newServices = contractData.services.filter((_, i) => i !== index);
    onFieldChange("services", newServices);
  };

  const handleServiceChange = (index: number, field: keyof typeof contractData.services[0], value: string) => {
    const newServices = [...contractData.services];
    newServices[index][field] = value;
    onFieldChange("services", newServices);
  };

  const calculateTotalSpend = () => {
    const baseSpend = contractData.totalSpend;
    const totalDiscount = contractData.services.reduce((acc, service) => {
      return acc + parseFloat(service.currentDiscount) / 100;
    }, 0);
    const averageDiscount = totalDiscount / contractData.services.length;
    return baseSpend * (1 - averageDiscount);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="space-y-6 bg-[#2A2D3A] p-6 rounded-xl shadow-lg"
    >
      <h2
        className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
      >
        Contract Details
      </h2>
      <div
        className="text-xl font-semibold text-white flex items-center"
      >
        <DollarSign className="mr-2 h-6 w-6 text-green-400" />
        Total Spend: ${totalSpend.toLocaleString()}
      </div>
      <motion.div variants={fieldAnimation} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="carrier" className="text-gray-300">
              Carrier
            </Label>
            <Input
              value={contractData.carrier}
              onChange={(e) => onFieldChange("carrier", e.target.value)}
              className="w-full bg-[#1E2029] text-white border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="totalSpend" className="text-gray-300">
              Initial Annual Spend
            </Label>
            <Input
              type="number"
              value={contractData.totalSpend}
              onChange={(e) =>
                onFieldChange("totalSpend", parseFloat(e.target.value))
              }
              className="w-full bg-[#1E2029] text-white border-gray-600"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Type</TableHead>
              <TableHead>Weight Range</TableHead>
              <TableHead>Current Discount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contractData.services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={service.type}
                    onChange={(e) =>
                      handleServiceChange(index, "type", e.target.value)
                    }
                    className="w-full bg-[#1E2029] text-white border-gray-600"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={service.weightRange}
                    onChange={(e) =>
                      handleServiceChange(index, "weightRange", e.target.value)
                    }
                    className="w-full bg-[#1E2029] text-white border-gray-600"
                  />
                </TableCell>
                <TableCell>
                  <div className="relative">
                    <Input
                      value={service.currentDiscount}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "currentDiscount",
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#1E2029] text-white border-gray-600 pr-8"
                    />

                    <Percent
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveService(index)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={handleAddService}
          variant="outline"
          className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </motion.div>
      <motion.div variants={fieldAnimation} className="mt-6">
        <Button
          onClick={handleSendNewTerms}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          Send New Terms
        </Button>
      </motion.div>
    </motion.div>
  );
}
