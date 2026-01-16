const DRIVADO_BACKEND_URL = process.env.NEXT_PUBLIC_DRIVADO_BACKEND_URL;

export function getEnvDrivadoBackendURL() {
  if (!DRIVADO_BACKEND_URL) {
    console.log("ENV: DRIVADO_BACKEND_URL is Required");
    process.exit(1);
  }

  return DRIVADO_BACKEND_URL;
}
