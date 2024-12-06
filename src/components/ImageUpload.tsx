import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export const ImageUpload = ({ onUpload, isLoading }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center gap-4">
        <label className="w-full cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            {preview ? (
              <img src={preview} alt="预览" className="max-h-[300px] mx-auto" />
            ) : (
              <div>
                <p>点击��拖拽上传人类图</p>
                <p className="text-sm text-gray-500 mt-2">支持 JPG、PNG 格式</p>
              </div>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
        {preview && (
          <Button variant="outline" onClick={() => setPreview(null)} disabled={isLoading}>
            重新上传
          </Button>
        )}
      </div>
    </Card>
  );
};
