"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { convertCode } from "@/lib/gemini";
import { languageOptions } from "@/config/languages";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();
  const handleConvert = async () => {
    try {
      setIsConverting(true);
      const result = await convertCode(inputCode, targetLanguage);
      setOutputCode(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-3xl mx-auto scrollbar">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            AI Code Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your code here..."
            className="min-h-[200px] font-mono"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <div className="flex items-center space-x-4">
            <Select onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleConvert}
              disabled={!inputCode || !targetLanguage || isConverting}
            >
              {isConverting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert"
              )}
            </Button>
          </div>
          {outputCode && (
            <Textarea
              className="min-h-[200px] font-mono"
              value={outputCode}
              readOnly
            />
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Jadamek 2024
        </CardFooter>
      </Card>
    </div>
  );
}
