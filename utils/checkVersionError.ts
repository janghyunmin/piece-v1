export const checkVersionError = (versionA: string, versionB: string) => {
  const [majorA, minorA, patchA] = versionA.split('.').map((v: string) => parseInt(v));
  const [majorB, minorB, patchB] = versionB.split('.').map((v: string) => parseInt(v));

  let versionError = false;

  if (majorA > majorB) {
    versionError = true;
  } else {
    if (minorA > minorB) {
      versionError = true;
    } else {
      if (patchA > patchB) {
        versionError = true;
      }
    }
  }

  return versionError;
}