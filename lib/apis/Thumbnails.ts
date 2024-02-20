import Client from "../client";
import Base from "./Base";

export type AssetThumbnail3D = {
    targetId: number;
    state: string;
    imageUrl: string;
};

export type AssetThumbnail = string;

export type AnimatedAssetThumbnail = string;

export type AvatarBodyshot = string;

export type AvatarThumbnail3D = {
    targetId: number;
    state: string;
    imageUrl: string;
};

export type AvatarHeadshot = string;

export type AvatarBust = string;

export type BadgeIcon = string;

export type BundleThumbnail = string;

export type DevProductIcon = string;

export type GamePassIcon = string;

export type GroupIcon = string;

export type Outfit3dThumbnail = string;

export type ThumbnailMetaData = {
    isWebappUseCacheEnabled: boolean;
    webappCacheExpirationTimspan: string;
};

class BaseThumbnails extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://thumbnails.roblox.com/",
            client
        });
    }

		getAsset(assetId: number): Promise<AssetThumbnail> {
			return new Promise((resolve, reject) => {
				this.request({
					method: 'get',
					path: 'v1/assets',
					authRequired: true,
					params: {
						assetIds: assetId
					}
				}).then(response => {
					resolve(response.data.data[0].imageUrl)
				}).catch(error => {
					reject(error)
				})
			})
		}

    get3dAsset(assetId: number): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/assets-thumbnail-3d",
                authRequired: false,
                params: {
                    assetId
                }
            })
                .then(response => {
                    resolve(response.data.imageUrl);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAnimatedAsset(assetId: number): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/asset-thumbnail-animated",
                authRequired: false,
                params: {
                    assetId
                }
            })
                .then(response => {
                    resolve(response.data.imageUrl);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

	getAvatarBodyshot(userId: number, size?: "30x30" | "48x48" | "50x50" | "60x60" | "75x75" | "100x100" | "110x110" | "150x150" | "180x180" | "352x352" | "420x420" | "720x720" | string, imageFormat?: "Png" | "Jpeg" | string, isCircular?: boolean): Promise<AvatarHeadshot> {
			return new Promise((resolve, reject) => {
					this.request({
							method: "get",
							path: "v1/users/avatar",
							authRequired: false,
							params: {
									userIds: userId,
									size: size,
									format: imageFormat,
									isCircular
							}
					})
							.then(response => {
									resolve(response.data.data[0].imageUrl)
							})
							.catch(error => {
									reject(error)
							})
		})
	}

    get3dAvatar (userId: number): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/users/avatar-3d",
                authRequired: false,
                params: {
                    userId
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

	getAvatarHeadshot(userId: number, size?: "48x48" | "50x50" | "60x60" | "75x75" | "100x100" | "110x110" | "150x150" | "180x180" | "352x352" | "420x420" | "720x720" | string, imageFormat?: "Png" | "Jpeg" | string, isCircular?: boolean): Promise<AvatarHeadshot> {
			return new Promise((resolve, reject) => {
					this.request({
							method: "get",
							path: "v1/users/avatar-headshot",
							authRequired: false,
							params: {
									userIds: userId,
									size: size,
									format: imageFormat,
									isCircular
							}
					})
							.then(response => {
									resolve(response.data.data[0].imageUrl)
							})
							.catch(error => {
									reject(error)
							})
		})
	}

	getAvatarBust(userId: number, size?: "48x48" | "50x50" | "60x60" | "75x75" | "100x100" | "110x110" | "150x150" | "180x180" | "352x352" | "420x420" | string, isCircular?: boolean): Promise<AvatarBust> {
			return new Promise((resolve, reject) => {
					this.request({
							method: "get",
							path: "v1/users/avatar-bust",
							authRequired: false,
							params: {
									userIds: userId,
									size: size,
									isCircular
							}
					})
							.then(response => {
									resolve(response.data.data[0].imageUrl)
							})
							.catch(error => {
									reject(error)
							})
		})
	}

    getMetaData (): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/metadata",
                authRequired: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getBadgeIcon (badgeId: number, isCircular?: boolean): Promise<BadgeIcon> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/badges/icons`,
                authRequired: false,
								params: {
									badgeIds: badgeId,
									isCircular
								}
            })
                .then(response => {
                    resolve(response.data.data[0].imageUrl);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getBundle (bundleId: number, size: "150x150" | "420x420" | string, isCircular?: boolean): Promise<BundleThumbnail> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/bundles/thumbnails?bundleIds=${bundleId}&size=${size}&format=Png&isCircular=${isCircular}`,
                authRequired: false,
								params: {
									bundleIds: bundleId,
									size,
									isCircular
								}
            })
                .then(response => {
                    resolve(response.data.data[0].imageUrl);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


		getDevProductIcon(developerProductId: number, isCircular?: boolean): Promise<DevProductIcon> {
			return new Promise((resolve , reject) => {
				this.request({
					method: 'get',
					path: 'v1/developer-products/icons',
					authRequired: false,
					params: {
						developerProductIds: developerProductId,
						isCircular
					}
				}).then(response => {
					resolve(response.data.data[0].imageUrl)
				}).catch(error => {
					reject(error)
				})
			})
		}

		getGamepassIcon(gamepassId: number, isCircular?: boolean): Promise<GamePassIcon> {
			return new Promise((resolve, reject) => {
				this.request({
					method: "get",
					path: "v1/game-passes",
					authRequired: false,
					params: {
						gamepassIds: gamepassId,
						isCircular
					}
				}).then(response => {
					resolve(response.data.data[0].imageUrl)
				}).catch(error => {
					reject(error)
				})
			})
		}

		getGroupIcon(groupId: number, size: "150x150" | "420x420" | string, isCircular?: boolean): Promise<GroupIcon> {
			return new Promise((resolve, reject) => {
				this.request({
					method: "get",
					path: `/v1/groups/icons`,
					authRequired: false,
					params: {
						groupIds: groupId,
						size,
						isCircular
					}
				}).then(response => {
					resolve(response.data.data[0].imageUrl)
				}).catch(error => {
					reject(error)
				})
			})
		}

		get3dOutfit(outfitId: number): Promise<Outfit3dThumbnail> {
			return new Promise((resolve, reject) => {
				this.request({
					method: "get",
					path: "v1/users/outfit-3d",
					authRequired: false,
					params: {
						outfitId
					}
				}).then(response => {
					resolve(response.data.data[0].imageUrl)
				}).catch(error => {
					reject(error)
				})
			})
		}
	
}

const Thumbnails = new BaseThumbnails();

export default Thumbnails;
