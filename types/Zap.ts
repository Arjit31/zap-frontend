export type Zap = {
    id: string;
    userId: string;
    actions: {
        id: string;
        zapId: string;
        typeId: string;
        sortOrder: 0;
        type: {
            id: string;
            name: string;
        };
    }[];
    triggers: {
        id: string;
        zapId: string;
        typeId: string;
        type: {
            id: string;
            name: string;
        };
    };
};