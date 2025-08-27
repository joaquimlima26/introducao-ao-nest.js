import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { CloudinaryService } from './cloudinary.service';
import { Place, placeType } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PlaceController testes', () => {
  let controller: PlaceController;
  let placeService: jest.Mocked<PlaceService>;
  let cloudinaryService: jest.Mocked<CloudinaryService>;

  beforeEach(async () => {
    const mockPlaceService = {
      findAll: jest.fn(),
      findPaginated: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any;

    const mockCloudinaryService = {
      uploadImage: jest.fn(),
      deleteImage: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [
        { provide: PlaceService, useValue: mockPlaceService },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
    placeService = module.get(PlaceService);
    cloudinaryService = module.get(CloudinaryService);
  });

  // "Deve listar todos os locais"
  it('deve listar todos os locais', async () => {
    const places: Place[] = [
      {
        id: '1',
        name: 'Bar Tunico',
        type: placeType.BAR,
        phone: '899223',
        latitude: 23.6,
        longitude: 23.5,
        images: [],
        created_at: new Date(),
      },
    ];

    placeService.findAll.mockResolvedValue(places);

    expect(await controller.findAll()).toEqual(places);
  });

  // "Deve listar locais paginados"
  it('deve listar locais paginados', async () => {

    const paginatedPlaces = [
      {
        id: '1',
        name: 'Bar Tunico',
        type: placeType.BAR,
        phone: '899223',
        latitude: 23.6,
        longitude: 23.5,
        images: [],
        created_at: new Date(),
      },
    ];

    const dto = { limit: 10, page: 12 };

    const paginated = {
      data: paginatedPlaces,
      meta: {
        total: 120,
        page: 12,
        lastPage: 12
      }
    };

    placeService.findPaginated.mockResolvedValue(paginated)

    const result = await controller.findPagineted(dto.page, dto.limit)

    expect(result).toEqual(paginated)

  });

  // Deve criar um local (place)
  it('deve criar um local com imagens', async () => {
    const dto = {
      name: 'Praça',
      type: placeType.HOTEL,
      phone: '9023452',
      latitude: 28,
      longitude: 27,
    };

    const files = { images: [{ buffer: Buffer.from('img') }] } as any;

    cloudinaryService.uploadImage.mockResolvedValue({
      url: 'hhtps://',
      public_id: 'id_from_cloudinary',
    });

    placeService.create.mockResolvedValue({
      id: '1',
      images: [{ url: 'hhtps://', public_id: 'id_from_cloudinary' }],
      created_at: new Date(),
      ...dto,
    });

    const result = await controller.createPlace(dto as any, files);

    expect(cloudinaryService.uploadImage).toHaveBeenCalled();
    expect(placeService.create).toHaveBeenCalled();
    expect(result.id).toBe('1');
  });

  // Deve lançar erro ao criar place sem imagens
  // dica .reject.toThrow()

  it('deve lançar erro ao criar place sem imagem', async () => {
    const dto = {
      name: 'Praça',
      type: placeType.HOTEL,
      phone: '9023452',
      latitude: 28,
      longitude: 27,
    };

    const files = { images: [] } as any;

    await expect(controller.createPlace(dto, files)).rejects.toThrow(
      BadRequestException,
    );
  });

  // Deve atualizar place com sucesso
  it('deve atualizar um place com sucesso', async () => {
    const dto = {phone: "Novo Phone"};
    const mockUpdatedPlace = {
      id: '1',
      name: 'Praça Central',
      type: placeType.HOTEL,
      phone: 'Novo Phone',
      latitude: 28,
      longitude: 27,
      images: [],
      created_at: new Date(),
    };

    placeService.update.mockResolvedValue(mockUpdatedPlace);

    const files = { images: [] } as any;

    const result = await controller.updatePlace('1', dto as any, files);

    expect(result).toEqual(mockUpdatedPlace);
    expect(placeService.update).toHaveBeenCalledWith('1', dto, []);
  });

  // Deve lançar erro ao tentar atualizar place inexistente
  it('Erro ao tentar atualizar place inexistente ', async () => {
    const dto = { name: 'Nome inválido' };

    placeService.update.mockRejectedValue(new NotFoundException());

    await expect(controller.updatePlace('999', dto as any, { images: [] } as any))
      .rejects
      .toThrow(NotFoundException);

    expect(placeService.update).toHaveBeenCalledWith('999', dto, []);
  });

// Deve remover place com sucesso
it('deve remover um place com sucesso', async () => {
  const mockResponse = { message: 'Place deletado com sucesso' };

  placeService.delete = jest.fn().mockResolvedValue(mockResponse);

  const result = await controller.deletePlace('2');

  expect(result).toEqual(mockResponse);
  expect(placeService.delete).toHaveBeenCalledWith('2');
});

// Deve lançar erro ao tentar remover place inexistente
it('deve lançar erro ao remover place inexistente', async () => {
  placeService.delete = jest.fn().mockRejectedValue(new NotFoundException());

  await expect(controller.deletePlace('999')).rejects.toThrow(NotFoundException);
  expect(placeService.delete).toHaveBeenCalledWith('999');
});

});