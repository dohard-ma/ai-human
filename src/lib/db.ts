class ApiDataService {
  private async request<T>(action: string, payload?: Record<string, unknown>) {
    const res = await fetch("/api/cockpit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload }),
    });
    if (!res.ok) {
      throw new Error("请求失败");
    }
    return (await res.json()) as T;
  }

  async getSnapshot() {
    const res = await fetch("/api/cockpit", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("加载失败");
    }
    return (await res.json()) as {
      tasks: any[];
      habits: any[];
      logs: any[];
      ideas: any[];
      relations: any[];
      state: string;
      northStar: {
        objective: string;
        version: string;
        principles: string[];
        notes: string;
      };
    };
  }

  async updateTaskStatus(id: string, status: string) {
    await this.request("updateTaskStatus", { id, status });
  }

  async addTask(content: string) {
    await this.request("addTask", { content });
  }

  async deleteIdea(id: string) {
    await this.request("deleteIdea", { id });
  }

  async addIdea(content: string) {
    await this.request("addIdea", { content });
  }

  async addLog(content: string, logType: string) {
    await this.request("addLog", { content, logType });
  }

  async deleteLog(id: string) {
    await this.request("deleteLog", { id });
  }

  async toggleHabit(id: string) {
    await this.request("toggleHabit", { id });
  }

  async addHabit(content: string) {
    await this.request("addHabit", { content });
  }

  async updateHabit(id: string, content: string) {
    await this.request("updateHabit", { id, content });
  }

  async setCommanderState(state: string) {
    await this.request("setCommanderState", { state });
  }

  async updateNorthStar(
    objective: string,
    version: string,
    principles: string[],
    notes: string
  ) {
    await this.request("updateNorthStar", {
      objective,
      version,
      principles,
      notes,
    });
  }
}

export const db = new ApiDataService();
