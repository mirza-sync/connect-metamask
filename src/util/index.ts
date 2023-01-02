export const ellipsisMiddle = (address: string): string => {
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
}