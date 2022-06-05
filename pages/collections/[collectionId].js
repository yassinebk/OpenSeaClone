import { useMarketplace, useNFTCollection, useNFTs } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import Header from "../../components/Header";
import NFTCard from "../../components/NFTCard.js";
import { client } from "../../lib/sanityClient.js";

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collection = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  const nftCollection = useNFTCollection(
    "0xca4F98276C78C0F490Bd56adc25D7535a2309d95"
  );
  const [collections, setCollections] = useState(null);
  const { data: nfts } = useNFTs(nftCollection);
  const [listings, setListings] = useState([]);
  const marketplace = useMarketplace(
    "0xDD4F9103f6fE6854B38DcE09a009A6215e33CFcF"
  );

  useEffect(() => {
    if (nfts) {
      console.log("nfts here", nfts);
    }
  }, [nfts]);

  const getListings = async () => {
    const listings = await marketplace.getAllListings();
    console.log(listings);
    setListings(listings);
  };
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;
    console.log("here1");
    const collectionData = await sanityClient.fetch(query);
    console.log("here2");
    setCollections(collectionData[0]);
    console.log(collections);
  };
  useEffect(() => {
    if (typeof collectionId !== "undefined") fetchCollectionData();
  }, [collectionId]);
  useEffect(() => {
    if (typeof marketplace !== "undefined") getListings();
  }, [marketplace]);

  if (!collections) return <h1>Loading ... </h1>;
  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collections?.bannerImageUrl
              ? collections?.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collections?.imageUrl
                ? collections?.imageUrl
                : "https://via.placeholder.com/200"
            }
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collections?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created By {"  "}
            <span className="text-[#2081e2]">{collections?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts?.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collections?.allOwners ? collections.allOwners.length : ""}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collections?.floorPrice}.5k
              </div>
              <div className={style.statName}>Floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collections?.volumeTraded}.5k
              </div>
              <div className={style.statName}>Volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collections?.description}</div>
        </div>
        <div className="flex flex-wrap">
          {nfts
            ? nfts.map((nftItem, id) => {
                console.log(nftItem);
                return (
                  <NFTCard
                    nftItem={nftItem}
                    key={id}
                    title={collections?.title}
                    listings={listings}
                  />
                );
              })
            : ""}
        </div>

        {/*  */}
      </div>

      {/* <NFTCard /> */}
    </div>
  );
};

export default Collection;
