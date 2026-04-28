export const downloadFile = (uri: string, downloadName: string) => {
  const link = document.createElement("a");
  link.download = downloadName;
  link.href = uri;
  link.click();
  link.remove();
};

export const downloadTextFile = (content: string, downloadName: string) => {
  const uri = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" })
  );

  downloadFile(uri, downloadName);
  window.setTimeout(() => URL.revokeObjectURL(uri), 0);
};
