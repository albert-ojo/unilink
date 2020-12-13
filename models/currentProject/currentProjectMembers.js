class CurrentProjectMembers {
  constructor(
    id,
    currentProjectId,
    newProjectId,
    name,
    userId,
    role,
    authority
  ) {
    this.id = id;
    this.currentProjectId = currentProjectId;
    this.newProjectId = newProjectId;
    this.name = name;
    this.userId = userId;
    this.role = role;
    this.authority = authority;
  }
}

export default CurrentProjectMembers;
