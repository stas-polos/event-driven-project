export class TaskDeleted {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
  ) {}
}
