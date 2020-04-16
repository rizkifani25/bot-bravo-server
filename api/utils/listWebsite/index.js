const websites = [
  { website: "mitra-tokopedia", url: "https://mitra.tokopedia.com" },
  { website: "Belum terdaftar", url: "Belum terdaftar." }
];

exports.getURL = website => {
  let result = websites.filter(item => item.website === website);
  if (result.length > 0) {
    return result[0];
  }
  return websites[websites.length - 1];
};
