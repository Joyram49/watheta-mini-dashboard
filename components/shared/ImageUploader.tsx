/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useRef, useState } from 'react';

import { Eye, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  value?: string;
  onChange?: (url: string, data?: any) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
  buttonText?: string;
  accept?: string;
  disabled?: boolean;
}

export default function ImageUploader({
  value = '',
  onChange,
  onUploadStateChange,
  buttonText = 'Upload',
  accept = 'image/*',
  disabled = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const shortUrl = useMemo(() => {
    if (!value) return '';
    try {
      const url = new URL(value);
      const pathname = url.pathname || '';
      const marker = '/watheta-dashboard/';
      const idx = pathname.indexOf(marker);
      const tail = idx >= 0 ? pathname.slice(idx + marker.length) : pathname;
      const last = tail.split('/').filter(Boolean).pop() || tail;
      if (last.length > 28) {
        const dot = last.lastIndexOf('.');
        const name = dot > -1 ? last.slice(0, dot) : last;
        const ext = dot > -1 ? last.slice(dot) : '';
        return `${name.slice(0, 20)}...${ext}`;
      }
      return last;
    } catch {
      // Fallback for non-URL strings
      return value;
    }
  }, [value]);

  const handlePick = () => {
    const isDisabled = disabled || isUploading || !!value;
    if (!isDisabled) fileInputRef.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    try {
      setIsUploading(true);
      onUploadStateChange?.(true);
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok || !data?.success || !data?.url) {
        throw new Error(data?.message || 'Upload failed');
      }
      onChange?.(data.url, data);
    } catch (err: any) {
      setError(err?.message || 'Upload failed');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsUploading(false);
      onUploadStateChange?.(false);
    }
  };

  const handleRemove = () => {
    onChange?.('', null);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        className='hidden'
        onChange={handleFile}
      />

      <button
        type='button'
        className='inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        onClick={handlePick}
        disabled={disabled || isUploading || !!value}
      >
        {isUploading ? (
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600' />
        ) : (
          <Upload className='h-4 w-4' />
        )}
        <span>{isUploading ? 'Uploading...' : buttonText}</span>
      </button>

      {error ? <div className='mt-1 text-sm text-red-600'>{error}</div> : null}

      {value ? (
        <div className='mt-2 flex items-center gap-2'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm text-blue-600 underline hover:text-blue-500'
            onClick={() => setPreviewOpen(true)}
            title={value}
          >
            <Eye className='h-3 w-3' />
            {shortUrl}
          </button>
          <button
            type='button'
            className='inline-flex items-center rounded-md border border-red-300 bg-white px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
            onClick={handleRemove}
            aria-label='Remove'
          >
            <X className='h-3 w-3' />
          </button>
        </div>
      ) : null}

      {previewOpen ? (
        <div
          className='bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black'
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className='max-h-[90vh] max-w-[90vw] rounded-lg bg-white shadow-lg'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex justify-end p-2'>
              <button
                type='button'
                className='inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
                onClick={() => setPreviewOpen(false)}
              >
                <X className='h-3 w-3' />
              </button>
            </div>
            <div className='p-2'>
              <Image
                src={value}
                alt='Preview'
                width={800}
                height={600}
                className='max-h-[80vh] max-w-[86vw] object-contain'
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
