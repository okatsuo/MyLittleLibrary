export interface IGenerateAccessToken {
  generate: (id: string, name: string) => Promise<string>
}
