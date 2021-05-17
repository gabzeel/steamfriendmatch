const getFile = (req: any, res: any) => {
  const { fileKey } = req.params;
  const file = `${__dirname}/../../files/${fileKey}.jpg`;
  res.download(file, (error: any) => {
    if (error) {
      res.status(404).send({ error: "File not found" });
    }
  });
};

export { getFile };
