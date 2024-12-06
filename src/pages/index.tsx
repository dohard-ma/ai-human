import { useState } from "react";
import { NextPage } from "next";
import { ImageUpload } from "@/components/ImageUpload";
import { HumanGraphAnalysis } from "@/types/analysis";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<HumanGraphAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        setAnalysis(result.data);
      } else {
        setError(result.error || "解析失败");
      }
    } catch (err) {
      setError("上传失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">人类图解析</h1>

      <ImageUpload onUpload={handleUpload} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-4 text-center">
          <p>正在解析中...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">解析结果</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Home;
