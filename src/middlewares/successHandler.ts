export default function successHandler(message: string, data: any) {
  return {
    data: data || undefined,
    message: message || 'Successful',
    status: 'OK',
  };
}
