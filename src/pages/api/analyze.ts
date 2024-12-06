import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { AnalysisResponse } from "@/types/analysis";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalysisResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "方法不允许" });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    // TODO: 这里需要实现实际的图像解析逻辑
    // 目前返回模拟数据
    const mockAnalysis = {
      centers: {
        head: true,
        ajna: false,
        throat: true,
        g: true,
        heart: false,
        solar: true,
        sacral: false,
        root: true,
        spleen: false,
      },
      channels: [{ from: "throat", to: "g", defined: true }],
      gates: [{ number: 1, defined: true, position: "head" }],
    };

    res.status(200).json({
      success: true,
      data: mockAnalysis,
    });
  } catch (error) {
    console.error("解析错误:", error);
    res.status(500).json({
      success: false,
      error: "图片解析失败",
    });
  }
}
