// types/data-structure.ts

// 定义触发器的接口
interface Trigger {
  state: number; // 触发器的状态
  planet: number; // 相关行星的 ID
  activation: number; // 激活状态
  gate: number; // 门的 ID
  line: number; // 行的 ID
  chartId: number; // 图表的 ID
}

// 定义修复的接口
interface Fixing {
  triggers: Trigger[]; // 触发器数组
  state: number; // 修复状态
  conditioned: boolean; // 是否被条件化
}

// 定义行星的接口
interface Planet {
  activation: number; // 激活状态
  base: number; // 基础值
  color: number; // 颜色值
  fixing: Fixing; // 修复信息
  gate: number; // 门的 ID
  line: number; // 行的 ID
  tone: number; // 音调值
  basePercent: number; // 基础百分比
  colorPercent: number; // 颜色百分比
  gatePercent: number; // 门的百分比
  id: number; // 行星的 ID
  longitude: number; // 经度
  linePercent: number; // 行的百分比
  tonePercent: number; // 音调的百分比
  chartId: number; // 图表的 ID
  baseAlignment?: number; // 基础对齐（可选）
}

// 定义门的接口
interface Gate {
  gate: number; // 门的 ID
  mode: number; // 模式
}

// 定义额外行星的接口
interface ExtraPlanet {
  activation: number; // 激活状态
  base: number; // 基础值
  color: number; // 颜色值
  fixing: number; // 修复值
  gate: number; // 门的 ID
  line: number; // 行的 ID
  tone: number; // 音调值
  basePercent: number; // 基础百分比
  colorPercent: number; // 颜色百分比
  fx: any[]; // 特效（未定义具体结构）
  gatePercent: number; // 门的百分比
  id: number; // 行星的 ID
  longitude: number; // 经度
  linePercent: number; // 行的百分比
  tonePercent: number; // 音调的百分比
}

// 定义出生数据的接口
interface BirthData {
  location: {
    country: string; // 国家
    city: string; // 城市
  };
  time: {
    local: string; // 本地时间
    utc: string; // UTC 时间
    isInUtc: boolean; // 是否在 UTC 中
    status: string; // 状态
    timezone: {
      id: string; // 时区 ID
      name: string; // 时区名称
      offset: number; // 时区偏移
    };
    dst: any; // 夏令时（未定义具体结构）
    design: string; // 设计时间
  };
  reliability: {
    score: number; // 可靠性评分
    context: string; // 上下文
    changes: {
      authority: number; // 权威变化
      cross: number; // 交叉变化
      definition: number; // 定义变化
      profile: number; // 个人资料变化
      type: number; // 类型变化
      variable: number; // 变量变化
      channels: number; // 通道变化
      centers: number; // 中心变化
    };
  };
}

// 定义元数据的接口
interface Meta {
  type: string; // 类型
  name: string; // 名称
  tags: string[]; // 标签
  created: string; // 创建时间
  updated: string; // 更新时间
  dirty: boolean; // 是否脏数据
  birthData: BirthData; // 出生数据
  atlasCheck: {
    message: string; // 地图检查消息
  };
}

// 定义数据的主接口
interface DataStructure {
  chart: {
    planets: Planet[]; // 行星数组
    gates: Gate[]; // 门数组
    channels: number[]; // 通道数组
    centers: number[]; // 中心数组
    profile: number; // 个人资料
    cross: number; // 交叉
    variable: number; // 变量
    designBaseOrientation: number; // 设计基础方向
    determination: number; // 决定性
    cognition: number; // 认知
    environment: number; // 环境
    personalityBaseOrientation: number; // 个性基础方向
    motivation: number; // 动机
    transference: number; // 转移
    sense: number; // 感知
    view: number; // 视图
    type: number; // 类型
    authority: number; // 权威
    definition: number; // 定义
    bridges: {
      bridgingGates: number[]; // 桥接门数组
      bridgingChannels: string[]; // 桥接通道数组
      bridgingFarGates: number[]; // 桥接远门数组
    };
    group: {
      env: string[]; // 环境数组
      theme: number[]; // 主题数组
      lb: boolean; // 是否为 lb
    };
    cycles: {
      chiron: string; // 奇龙周期
      saturn: string; // 土星周期
      uranus: string; // 天王星周期
      secondSaturn: string; // 第二个土星周期
    };
    extraPlanets: ExtraPlanet[][]; // 额外行星数组
  };
  meta: Meta; // 元数据
  flags: any[]; // 标志数组（未定义具体结构）
  tags: string[]; // 标签数组
}

// 定义数据结构
const data: DataStructure = {
  chart: {
    planets: [
      {
        activation: 1,
        base: 1,
        color: 5,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 9,
        line: 4,
        tone: 4,
        basePercent: 67,
        colorPercent: 52,
        gatePercent: 62,
        id: 0,
        longitude: 249.269159622633,
        linePercent: 75,
        tonePercent: 13,
        chartId: 0,
        baseAlignment: 4,
      },
      {
        activation: 1,
        base: 1,
        color: 5,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 16,
        line: 4,
        tone: 4,
        basePercent: 67,
        colorPercent: 52,
        gatePercent: 62,
        id: 1,
        longitude: 69.26915962263297,
        linePercent: 75,
        tonePercent: 13,
        chartId: 0,
        baseAlignment: 4,
      },
      {
        activation: 1,
        base: 1,
        color: 3,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 7,
        line: 5,
        tone: 6,
        basePercent: 57,
        colorPercent: 85,
        gatePercent: 74,
        id: 2,
        longitude: 137.44570778402542,
        linePercent: 47,
        tonePercent: 11,
        chartId: 0,
      },
      {
        activation: 1,
        base: 5,
        color: 6,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 18,
        line: 2,
        tone: 1,
        basePercent: 73,
        colorPercent: 15,
        gatePercent: 30,
        id: 3,
        longitude: 185.61840648776757,
        linePercent: 85,
        tonePercent: 94,
        chartId: 0,
        baseAlignment: 2,
      },
      {
        activation: 1,
        base: 5,
        color: 6,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 17,
        line: 2,
        tone: 1,
        basePercent: 73,
        colorPercent: 15,
        gatePercent: 30,
        id: 4,
        longitude: 5.618406487767572,
        linePercent: 85,
        tonePercent: 94,
        chartId: 0,
        baseAlignment: 2,
      },
      {
        activation: 1,
        base: 4,
        color: 4,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 11,
        line: 3,
        tone: 4,
        basePercent: 80,
        colorPercent: 62,
        gatePercent: 43,
        id: 5,
        longitude: 265.06670674219356,
        linePercent: 60,
        tonePercent: 76,
        chartId: 0,
      },
      {
        activation: 1,
        base: 2,
        color: 4,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 44,
        line: 3,
        tone: 4,
        basePercent: 18,
        colorPercent: 53,
        gatePercent: 43,
        id: 6,
        longitude: 220.05302424996668,
        linePercent: 58,
        tonePercent: 23,
        chartId: 0,
      },
      {
        activation: 1,
        base: 5,
        color: 4,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 64,
        line: 6,
        tone: 1,
        basePercent: 9,
        colorPercent: 13,
        gatePercent: 92,
        id: 7,
        longitude: 166.5525945165809,
        linePercent: 52,
        tonePercent: 81,
        chartId: 0,
      },
      {
        activation: 1,
        base: 4,
        color: 3,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 54,
        line: 4,
        tone: 5,
        basePercent: 81,
        colorPercent: 79,
        gatePercent: 57,
        id: 8,
        longitude: 288.37405565778545,
        linePercent: 46,
        tonePercent: 76,
        chartId: 0,
      },
      {
        activation: 1,
        base: 4,
        color: 4,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 25,
        line: 3,
        tone: 1,
        basePercent: 86,
        colorPercent: 12,
        gatePercent: 42,
        id: 9,
        longitude: 0.613872399980536,
        linePercent: 52,
        tonePercent: 77,
        chartId: 0,
      },
      {
        activation: 1,
        base: 5,
        color: 5,
        fixing: {
          triggers: [
            {
              state: 2,
              planet: 10,
              activation: 1,
              gate: 60,
              line: 6,
              chartId: 0,
            },
            {
              state: 2,
              planet: 10,
              activation: 0,
              gate: 60,
              line: 6,
              chartId: 0,
            },
          ],
          state: 2,
          conditioned: false,
        },
        gate: 60,
        line: 6,
        tone: 3,
        basePercent: 22,
        colorPercent: 47,
        gatePercent: 95,
        id: 10,
        longitude: 301.7615866322352,
        linePercent: 74,
        tonePercent: 84,
        chartId: 0,
      },
      {
        activation: 1,
        base: 1,
        color: 3,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 61,
        line: 6,
        tone: 3,
        basePercent: 94,
        colorPercent: 36,
        gatePercent: 89,
        id: 11,
        longitude: 295.8069939596801,
        linePercent: 39,
        tonePercent: 18,
        chartId: 0,
      },
      {
        activation: 1,
        base: 4,
        color: 2,
        fixing: {
          triggers: [
            {
              state: 2,
              planet: 12,
              activation: 1,
              gate: 34,
              line: 4,
              chartId: 0,
            },
            {
              state: 2,
              planet: 12,
              activation: 0,
              gate: 34,
              line: 1,
              chartId: 0,
            },
          ],
          state: 2,
          conditioned: false,
        },
        gate: 34,
        line: 4,
        tone: 6,
        basePercent: 7,
        colorPercent: 93,
        gatePercent: 55,
        id: 12,
        longitude: 243.23995554128484,
        linePercent: 32,
        tonePercent: 61,
        chartId: 0,
      },
      {
        activation: 0,
        base: 5,
        color: 6,
        fixing: {
          triggers: [
            {
              state: 2,
              planet: 0,
              activation: 0,
              gate: 40,
              line: 6,
              chartId: 0,
            },
            {
              state: 1,
              planet: 1,
              activation: 0,
              gate: 37,
              line: 6,
              chartId: 0,
            },
          ],
          state: 3,
          conditioned: false,
        },
        gate: 40,
        line: 6,
        tone: 2,
        basePercent: 67,
        colorPercent: 32,
        gatePercent: 98,
        id: 0,
        longitude: 161.26915962323108,
        linePercent: 88,
        tonePercent: 93,
        chartId: 0,
        baseAlignment: 4,
      },
      {
        activation: 0,
        base: 5,
        color: 6,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 37,
        line: 6,
        tone: 2,
        basePercent: 67,
        colorPercent: 32,
        gatePercent: 98,
        id: 1,
        longitude: 341.2691596232311,
        linePercent: 88,
        tonePercent: 93,
        chartId: 0,
        baseAlignment: 4,
      },
      {
        activation: 0,
        base: 3,
        color: 1,
        fixing: {
          triggers: [
            {
              state: 2,
              planet: 2,
              activation: 0,
              gate: 8,
              line: 3,
              chartId: 0,
            },
          ],
          state: 2,
          conditioned: false,
        },
        gate: 8,
        line: 3,
        tone: 2,
        basePercent: 42,
        colorPercent: 24,
        gatePercent: 34,
        id: 2,
        longitude: 56.41365003489614,
        linePercent: 4,
        tonePercent: 48,
        chartId: 0,
      },
      {
        activation: 0,
        base: 5,
        color: 5,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 18,
        line: 5,
        tone: 2,
        basePercent: 81,
        colorPercent: 32,
        gatePercent: 78,
        id: 3,
        longitude: 188.30113005109683,
        linePercent: 72,
        tonePercent: 96,
        chartId: 0,
        baseAlignment: 4,
      },
      {
        activation: 0,
        base: 5,
        color: 5,
        fixing: {
          triggers: [
            {
              state: 1,
              planet: 7,
              activation: 0,
              gate: 62,
              line: 6,
              chartId: 0,
            },
          ],
          state: 1,
          conditioned: false,
        },
        gate: 17,
        line: 5,
        tone: 2,
        basePercent: 81,
        colorPercent: 32,
        gatePercent: 78,
        id: 4,
        longitude: 8.301130051096834,
        linePercent: 72,
        tonePercent: 96,
        chartId: 0,
        baseAlignment: 4,
      },
      {
        activation: 0,
        base: 1,
        color: 4,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 46,
        line: 6,
        tone: 3,
        basePercent: 94,
        colorPercent: 36,
        gatePercent: 92,
        id: 5,
        longitude: 183.4632622096192,
        linePercent: 56,
        tonePercent: 18,
        chartId: 0,
      },
      {
        activation: 0,
        base: 2,
        color: 5,
        fixing: {
          triggers: [
            {
              state: 2,
              planet: 9,
              activation: 0,
              gate: 17,
              line: 2,
              chartId: 0,
            },
          ],
          state: 2,
          conditioned: false,
        },
        gate: 62,
        line: 6,
        tone: 2,
        basePercent: 59,
        colorPercent: 21,
        gatePercent: 95,
        id: 6,
        longitude: 116.09683751320708,
        linePercent: 70,
        tonePercent: 31,
        chartId: 0,
      },
      {
        activation: 0,
        base: 1,
        color: 4,
        fixing: {
          triggers: [
            {
              state: 2,
              planet: 9,
              activation: 0,
              gate: 17,
              line: 2,
              chartId: 0,
            },
          ],
          state: 2,
          conditioned: false,
        },
        gate: 62,
        line: 6,
        tone: 5,
        basePercent: 64,
        colorPercent: 68,
        gatePercent: 93,
        id: 7,
        longitude: 116.01377819234995,
        linePercent: 61,
        tonePercent: 12,
        chartId: 0,
      },
      {
        activation: 0,
        base: 3,
        color: 2,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 58,
        line: 5,
        tone: 2,
        basePercent: 42,
        colorPercent: 24,
        gatePercent: 70,
        id: 8,
        longitude: 277.81991596682184,
        linePercent: 20,
        tonePercent: 48,
        chartId: 0,
      },
      {
        activation: 0,
        base: 5,
        color: 6,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 17,
        line: 2,
        tone: 4,
        basePercent: 70,
        colorPercent: 65,
        gatePercent: 32,
        id: 9,
        longitude: 5.696383038463049,
        linePercent: 94,
        tonePercent: 94,
        chartId: 0,
      },
      {
        activation: 0,
        base: 1,
        color: 1,
        fixing: {
          triggers: [
            {
              state: 2,
              planet: 10,
              activation: 1,
              gate: 60,
              line: 6,
              chartId: 0,
            },
            {
              state: 2,
              planet: 10,
              activation: 0,
              gate: 60,
              line: 6,
              chartId: 0,
            },
          ],
          state: 2,
          conditioned: false,
        },
        gate: 60,
        line: 6,
        tone: 5,
        basePercent: 48,
        colorPercent: 68,
        gatePercent: 85,
        id: 10,
        longitude: 301.1692120185569,
        linePercent: 11,
        tonePercent: 9,
        chartId: 0,
      },
      {
        activation: 0,
        base: 2,
        color: 5,
        fixing: {
          triggers: [],
          state: 0,
          conditioned: false,
        },
        gate: 61,
        line: 5,
        tone: 6,
        basePercent: 83,
        colorPercent: 89,
        gatePercent: 80,
        id: 11,
        longitude: 295.2647708082084,
        linePercent: 81,
        tonePercent: 36,
        chartId: 0,
      },
      {
        activation: 0,
        base: 1,
        color: 3,
        fixing: {
          triggers: [
            {
              state: 1,
              planet: 12,
              activation: 1,
              gate: 34,
              line: 4,
              chartId: 0,
            },
            {
              state: 1,
              planet: 12,
              activation: 0,
              gate: 34,
              line: 1,
              chartId: 0,
            },
          ],
          state: 1,
          conditioned: false,
        },
        gate: 34,
        line: 1,
        tone: 3,
        basePercent: 98,
        colorPercent: 36,
        gatePercent: 6,
        id: 12,
        longitude: 240.49472787303097,
        linePercent: 39,
        tonePercent: 19,
        chartId: 0,
      },
    ],
    gates: [
      {
        gate: 7,
        mode: 1,
      },
      {
        gate: 8,
        mode: 0,
      },
      {
        gate: 9,
        mode: 1,
      },
      {
        gate: 11,
        mode: 1,
      },
      {
        gate: 16,
        mode: 1,
      },
      {
        gate: 17,
        mode: 2,
      },
      {
        gate: 18,
        mode: 2,
      },
      {
        gate: 25,
        mode: 1,
      },
      {
        gate: 34,
        mode: 2,
      },
      {
        gate: 37,
        mode: 0,
      },
      {
        gate: 40,
        mode: 0,
      },
      {
        gate: 44,
        mode: 1,
      },
      {
        gate: 46,
        mode: 0,
      },
      {
        gate: 54,
        mode: 1,
      },
      {
        gate: 58,
        mode: 0,
      },
      {
        gate: 60,
        mode: 2,
      },
      {
        gate: 61,
        mode: 2,
      },
      {
        gate: 62,
        mode: 0,
      },
      {
        gate: 64,
        mode: 1,
      },
    ],
    channels: [17, 16, 32],
    centers: [2, 1, 2, 2, 2, 1, 2, 2, 1],
    profile: 46,
    cross: 163,
    variable: 8,
    designBaseOrientation: 0,
    determination: 5,
    cognition: 1,
    environment: 4,
    personalityBaseOrientation: 2,
    motivation: 4,
    transference: 1,
    sense: 3,
    view: 6,
    type: 3,
    authority: 0,
    definition: 3,
    bridges: {
      bridgingGates: [48, 26],
      bridgingChannels: ['12/22', '35/36', '45/21'],
      bridgingFarGates: [20, 57, 3, 48, 52, 26, 24, 1, 51, 31, 47, 56, 32],
    },
    group: {
      env: ['solo', 'partnership'],
      theme: [2, 3],
      lb: false,
    },
    cycles: {
      chiron: '2047-10-01T02:36:11Z',
      saturn: '2025-06-02T23:16:54Z',
      uranus: '2039-09-07T06:51:54Z',
      secondSaturn: '2055-03-27T17:09:17Z',
    },
    extraPlanets: [
      [
        {
          activation: 1,
          base: 5,
          color: 5,
          fixing: 0,
          gate: 50,
          line: 1,
          tone: 1,
          basePercent: 53,
          colorPercent: 15,
          fx: [],
          gatePercent: 11,
          id: 13,
          longitude: 207.02360110545942,
          linePercent: 69,
          tonePercent: 90,
        },
        {
          activation: 0,
          base: 4,
          color: 4,
          fixing: 0,
          gate: 48,
          line: 6,
          tone: 2,
          basePercent: 5,
          colorPercent: 26,
          fx: [],
          gatePercent: 92,
          id: 13,
          longitude: 194.6981890021525,
          linePercent: 54,
          tonePercent: 61,
        },
      ],
    ],
  },
  meta: {
    type: 'RAVE_CHART',
    name: 'sdzsd',
    tags: [],
    created: '2024-12-09T13:56:19Z',
    updated: '2024-12-09T13:56:19Z',
    dirty: true,
    birthData: {
      location: {
        country: 'CN',
        city: '北京 (Beijing)',
      },
      time: {
        local: '1996-12-01T12:41:00',
        utc: '1996-12-01T04:41:00Z',
        isInUtc: false,
        status: 'valid',
        timezone: {
          id: 'Asia/Shanghai',
          name: 'GMT+8',
          offset: 8,
        },
        dst: null,
        design: '1996-09-03T12:22:42Z',
      },
      reliability: {
        score: 80,
        context: 'CHANGES',
        changes: {
          authority: 151,
          cross: 151,
          definition: 151,
          profile: 151,
          type: 402,
          variable: -6,
          channels: 151,
          centers: 151,
        },
      },
    },
    atlasCheck: {
      message: 'PlaceNotFound',
    },
  },
  flags: [],
  tags: [],
};
