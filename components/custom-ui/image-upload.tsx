"use client";
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  onChange,
  onRemove
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (results: any) => {
    console.log("results", results);
    onChange(results.info.secure_url);
  };

  if (!isMounted) {
    return null;
  };

  console.log("value", value);

  return (
    <>
      <div>
        <div className='mb-4 flex items-center gap-4'>
          {value.map((url) => {
            console.log("url", url)

            return (
              <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                <div className='z-10 absolute top-2 right-2'>
                  <Button
                    type='button'
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemove(url)}
                  >
                    <Trash className='h-4 w-4' />
                  </Button>
                </div>

                <Image
                  fill
                  className='object-cover'
                  alt='Image'
                  src={url}
                />
              </div>
            )
          })}
        </div>

        <CldUploadWidget
          onUpload={onUpload}
          uploadPreset='kr6wprvf'
        >
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button
                type='button'
                disabled={disabled}
                variant="secondary"
                onClick={onClick}
              >
                <ImagePlus className='h-4 w-4 mr-2' />
                Upload an image
              </Button>
            )
          }}
        </CldUploadWidget>
      </div>
    </>
  );
};

export default ImageUpload;