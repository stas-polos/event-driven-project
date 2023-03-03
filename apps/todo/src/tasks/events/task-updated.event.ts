export class TaskUpdated {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
  ) {}
}
