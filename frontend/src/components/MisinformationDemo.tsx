"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FlaggedItem {
  text: string;
  reason: string;
  credibility: number;
}

const demoText = `Breaking: Scientists discover that coffee causes superhuman abilities! Studies claim that drinking 10 cups a day increases IQ by 50%.`;
const flaggedContent = [
  {
    text: "coffee causes superhuman abilities",
    reason: "Exaggerated claim with no scientific basis",
    credibility: 20,
  },
  {
    text: "drinking 10 cups a day increases IQ by 50%",
    reason: "No peer-reviewed studies support this claim",
    credibility: 15,
  },
];

export default function MisinformationDemo() {
  const [selectedText, setSelectedText] = useState<FlaggedItem | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Misinformation Detection Demo</h1>
      <Card className="w-full max-w-2xl p-6">
        <CardContent>
          <p className="text-lg">
            {demoText.split(" ").map((word, index) => {
              const flagged = flaggedContent.find((item) =>
                item.text.includes(word)
              );
              return flagged ? (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <motion.span
                      className="bg-red-400 text-white px-1 rounded cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedText(flagged)}
                    >
                      {word}
                    </motion.span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {flagged.reason}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <span key={index} className="mr-1">
                  {word}
                </span>
              );
            })}
          </p>
        </CardContent>
      </Card>
      {selectedText && (
        <motion.div
          className="mt-6 bg-white p-4 rounded-lg shadow-md w-full max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold">Why is this flagged?</h2>
          <p className="mt-2 text-gray-700">{selectedText.reason}</p>
          <div className="mt-4">
            <p className="font-medium">Credibility Score:</p>
            <Progress value={selectedText.credibility} className="mt-2" />
          </div>
          <Button
            className="mt-4"
            onClick={() => setSelectedText(null)}
          >
            Close
          </Button>
        </motion.div>
      )}
    </div>
  );
} 